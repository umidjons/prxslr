import Db from '../Db';
import * as debug from 'debug';
import { ICart } from '../interfaces';

const log = debug('api:Order');

export default class Order {

    static readonly STATE_CANCELLED = -1;
    static readonly STATE_NEW = 0;
    static readonly STATE_PAYED = 1;

    static readonly $collection = 'orders';

    async find(user_id: string, state: number = Order.STATE_NEW) {
        log(`find(${state})`);

        const condition = {user_id: Db.ObjectId(user_id)};

        if (typeof state !== 'undefined') {
            condition['state'] = state;
        }

        log(`condition: %O`, condition);

        return await Db.getDb().collection(Order.$collection).find(condition).toArray();
    }

    async findById(id: string) {
        return await Db.getDb().collection(Order.$collection).findOne({_id: Db.ObjectId(id)});
    }

    async create(user_id: string, cart: ICart): Promise<string> {
        try {
            log(`create(${user_id}, %O)`, cart);
            const doc = {
                user_id: Db.ObjectId(user_id),
                created_at: new Date(),
                payed_at: null,
                cart: cart,
                state: Order.STATE_NEW
            };
            const result = await Db.getDb().collection(Order.$collection).insertOne(doc);
            return result.insertedId.toHexString();
        } catch (err) {
            throw err;
        }
    }
}