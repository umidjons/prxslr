import Db from '../Db';
import * as debug from 'debug';

const log = debug('api:Product');

export default class Product {

    static readonly STATE_DELETED = -1;
    static readonly STATE_DISABLED = 0;
    static readonly STATE_ACTIVE = 1;

    static readonly TYPE_IPv6 = 'ipv6';
    static readonly TYPE_IPv4 = 'ipv4';
    static readonly TYPE_IPv4_SHARED = 'ipv4_shared';

    static readonly $collection = 'products';

    async find(state: number = Product.STATE_ACTIVE) {
        log(`find(${state})`);

        const condition = {};

        if (typeof state !== 'undefined') {
            condition['state'] = state;
        }

        log(`condition: %O`, condition);

        return await Db.getDb().collection(Product.$collection).find(condition).toArray();
    }

    async findById(id: string) {
        return await Db.getDb().collection(Product.$collection).findOne({_id: Db.ObjectId(id)});
    }

    async create(user_id: string,
                 title: string,
                 price: number,
                 type: string,
                 protocols: string[],
                 country_id: string,
                 state: number = Product.STATE_ACTIVE): Promise<string> {
        try {
            log(`create(${user_id},${title},${price},${type},${protocols},${country_id}, ${state})`);
            const doc = {
                user_id: Db.ObjectId(user_id),
                created_at: new Date(),
                title: title,
                price: price,
                type: type,
                protocols: protocols,
                country_id: Db.ObjectId(country_id),
                state: state
            };
            const result = await Db.getDb().collection(Product.$collection).insertOne(doc);
            return result.insertedId.toHexString();
        } catch (err) {
            throw err;
        }
    }
}