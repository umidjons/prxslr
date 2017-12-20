import Db from '../Db';
import * as debug from 'debug';
import * as moment from 'moment';

const log = debug('api:Proxies');

export default class Proxies {

    static readonly STATE_EXPIRED = -1;
    static readonly STATE_NEW = 0;
    static readonly STATE_ACTIVE = 1;

    static readonly $collection = 'proxies';

    async findByUserId(userId: string) {
        log(`findByUserId(${userId})`);
        return await Db.getDb().collection(Proxies.$collection).find({user_id: Db.ObjectId(userId)}).toArray();
    }

    async findById(id: string) {
        return await Db.getDb().collection(Proxies.$collection).findOne({_id: Db.ObjectId(id)});
    }

    async create(user_id: string,
                 protocols: string[],
                 ip: string,
                 port: number,
                 login: string,
                 password: string,
                 duration: number,
                 country_id: string,
                 order_id: string): Promise<string> {
        try {
            log(`create(${user_id}, %j, ${ip}, ${port}, ${login}, ${password}, ${country_id}, ${order_id})`, protocols);
            const created_at = new Date();
            const expired_at = moment(created_at).add(duration, 'day').toDate();
            const doc = {
                user_id: Db.ObjectId(user_id),
                protocols: protocols,
                ip: ip,
                port: port,
                login: login,
                password: password,
                created_at: created_at,
                activated_at: null,
                expired_at: expired_at,
                state: Proxies.STATE_NEW,
                country_id: Db.ObjectId(country_id),
                order_id: Db.ObjectId(order_id)
            };
            const result = await Db.getDb().collection(Proxies.$collection).insertOne(doc);
            return result.insertedId.toHexString();
        } catch (err) {
            throw err;
        }
    }
}