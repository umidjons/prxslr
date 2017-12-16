import * as express from 'express';
import * as passport from 'passport'
import * as debug from 'debug';
import { Strategy } from 'passport-local';
import * as validator from 'validator';
import User from './models/User';

const log = debug('api:Auth');

class Auth {

    public static isAuthorized(req, res, next) {
        if (!req.isAuthenticated()) {
            log('req.isAuthorized()==false');
            res.json({success: false, error: 'Permission denied.'});
        } else {
            log('req.isAuthorized()==true');
            next();
        }
    }

    public static getRouter(): express.Router {
        this.configureLocalStrategy();
        this.configreUserSerialization();

        const router = express.Router();
        router
            .post('/sign-up', async (req, res) => {
                log(`POST /sign-up req.body=%O`, req.body);
                const email = req.body.email;
                const password = req.body.password;

                if (!email || !email.trim() || !validator.isEmail(email)) {
                    return res.json({success: false, error: 'Invalid email.'});
                }

                if (!password || !password.trim() || password.trim().length < 3) {
                    return res.json({success: false, error: 'Invalid password'});
                }

                try {
                    const id = await (new User()).create(email, password);
                    return res.json({success: true, userId: id});
                } catch (e) {
                    return res.json({success: false, error: e.toString()});
                }
            })
            .post('/sign-in', passport.authenticate('local'), (req, res) => {
                log(`POST /sign-in req.session=${req.session.id}`);
                const user = {email: req.user.email};
                return res.json({success: true, sid: req.session.id, user: user});
            })
            .post('/sign-out', (req, res) => {
                log(`POST /sign-out`);
                req.logout();
                req.session.destroy(() => {
                    return res.json({success: true});
                });
            });
        return router;
    }

    private static configureLocalStrategy() {
        passport.use(new Strategy(
            {usernameField: 'email', passwordField: 'password'},
            async (email, password, done) => {
                log(`email: ${email} password: ${password}`);

                try {
                    if (!email || !email.trim() || !validator.isEmail(email)) {
                        return done(null, false, {message: 'Invalid email.'});
                    }

                    const user = await new User().findByEmail(email);
                    log('user=%O', user);
                    if (!user) {
                        return done(null, false, {message: 'User not found.'});
                    }

                    if (!await User.verifyPassword(password, user.password)) {
                        return done(null, false, {message: 'Incorrect password.'});
                    }

                    log('success');

                    return done(null, user);
                } catch (err) {
                    log('error: %O', err);
                    return done(null, false, {message: 'Incorrect username.'});
                }
            }
        ));
    }

    private static configreUserSerialization() {
        passport.serializeUser(function (user: { _id: string }, done) {
            log(`serializeUser(${user._id})`);
            done(null, user._id);
        });

        passport.deserializeUser(async function (id: string, done) {
            log(`deserializeUser(${id})`);
            try {
                const user = await new User().findById(id);
                done(null, user);
            } catch (err) {
                log(`Error: ${err}`);
                done(`Could not find user with id=${id}`, null);
            }
        });
    }
}

export default Auth;