import Db from '../Db';
import * as debug from 'debug';

const log = debug('api:Proxies');

export default class Proxies {

    async findByUserId(userId: string) {
        log(`findByUserId(${userId})`);
        return await Db.getDb().collection('proxies').find({user_id: Db.ObjectId(userId)}).toArray();
    }

    async findById(id: string) {
        return await Db.getDb().collection('proxies').findOne({_id: Db.ObjectId(id)});
    }
}