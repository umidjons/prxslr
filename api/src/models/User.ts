import Db from '../Db';
import * as debug from 'debug';
import * as bcrypt from 'bcrypt';
import Config from '../config';

const log = debug('api:User');

export default class User {

    async findByEmail(email: string) {
        log(`findByEmail(${email})`);
        return await Db.getDb().collection('users').findOne({email: email, state: 1});
    }

    async findById(id: string) {
        return await Db.getDb().collection('users').findOne({_id: Db.ObjectId(id)});
    }

    async create(email: string, password: string): Promise<string> {
        try {
            log(`create(${email}, ${password})`);
            const salt = await bcrypt.genSalt(Config.BCRYPT_SALT_ROUND);
            const passwordHash = await bcrypt.hash(password.trim(), salt);
            const doc = {email: email, password: passwordHash, salt: salt, state: 1, created: new Date()};
            const result = await Db.getDb().collection('users').insertOne(doc);
            return result.insertedId.toHexString();
        } catch (err) {
            throw err;
        }
    }

    static async verifyPassword(password, hash): Promise<boolean> {
        try {
            return await bcrypt.compare(password, hash);
        } catch (e) {
            return false;
        }
    }
}