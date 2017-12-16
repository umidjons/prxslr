import * as mongo from 'mongodb';
import * as debug from 'debug';
import Config from './config';

const log = debug('api:Db');

export default class Db {

    private static _db: mongo.Db;

    public static async connect() {
        log(`Connecting to ${Config.DB_URI}...`);
        try {
            const client = await mongo.MongoClient.connect(Config.DB_URI);
            Db._db = client.db(Config.DB_NAME);
            log('Succeeded. Db:', Config.DB_NAME);
        } catch (err) {
            log(`Failed: ${err}`);
            return err;
        }
    }

    public static getDb(): mongo.Db {
        return Db._db;
    }

    public static ObjectId(id: string): mongo.ObjectID {
        return new mongo.ObjectID(id);
    }
}
