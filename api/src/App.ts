import * as express from 'express';
import * as session from 'express-session';
import * as sessionMongo from 'connect-mongodb-session';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as debug from 'debug';
import Auth from './Auth';
import Config from './config';
import Proxies from './models/Proxies';
import Country from './models/Country';
import Product from './models/Product';

const log = debug('api:App');

class App {
    public express;
    private router;

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes(): void {
        log('mountRoutes()');

        const MongoDBStore = sessionMongo(session);
        const store = new MongoDBStore({
            uri: `${Config.DB_URI}/${Config.DB_NAME}`,
            collection: Config.DB_SESSION_COLLECTION
        });

        this.express
            .use(bodyParser.urlencoded({extended: true}))
            .use(bodyParser.json())
            .use(session({
                secret: Config.SESSION_SECRET,
                resave: true,
                saveUninitialized: true,
                name: 'connect.sid',
                store: store
            }))
            .use(passport.initialize())
            .use(passport.session())
            .use((req, res, next) => {
                log('req.session=%j', req.session);
                next();
            });

        this.router = express.Router();

        // Mount public routes
        this.publicRoutes();

        // Configure authentication
        this.router
            .use(Auth.getRouter())   // authorization routes
            .use(Auth.isAuthorized); // authorization check

        // Mount restricted routes
        this.restrictedRoutes();

        this.express
            .use('/api', this.router);
    }

    private publicRoutes(): express.Router {
        // todo: configure public routes here
        log('publicRoutes()');
        return this.router
            .get('/', (req, res) => {
                res.json({message: 'Hello from Public Area'});
            })
            .get('/open_page', (req, res) => {
                res.json({message: 'Open Page'});
            });
    }

    private restrictedRoutes(): express.Router {
        // todo: configure restricted routes
        log('restrictedRoutes()');
        return this.router
            .get('/countries', this.getCountries)
            .get('/products', this.getProducts)
            .get('/proxies', async (req, res) => {
                // log(`req.user=%O`, req.user);
                const items = await new Proxies().findByUserId(req.user._id);
                log(`items=%O`, items);
                res.json({success: true, result: items});
            })
            .get('/restricted', (req, res) => {
                log(`req.session=${req.session.id}`);
                res.json({message: 'Hello from Restricted Area'});
            });
    }

    private async getCountries(req, res) {
        const items = await new Country().find();
        log(`items=%o`, items);
        res.json({success: true, result: items});
    }

    private async getProducts(req, res) {
        const items = await new Product().find();
        log(`items=%o`, items);
        res.json({success: true, result: items});
    }
}

export default new App().express;