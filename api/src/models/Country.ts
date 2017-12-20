import Db from '../Db';
import * as debug from 'debug';

const log = debug('api:Country');

export default class Country {

    static readonly STATE_DELETED = -1;
    static readonly STATE_DISABLED = 0;
    static readonly STATE_ACTIVE = 1;

    static readonly $collection = 'countries';

    async find(state: number = Country.STATE_ACTIVE) {
        log(`find(${state})`);

        const condition = {};

        if (typeof state !== 'undefined') {
            condition['state'] = state;
        }

        log(`condition: %O`, condition);

        return await Db.getDb().collection(Country.$collection).find(condition).toArray();
    }

    async findById(id: string) {
        return await Db.getDb().collection(Country.$collection).findOne({_id: Db.ObjectId(id)});
    }

    async create(title: string, state: number = Country.STATE_ACTIVE): Promise<string> {
        try {
            log(`create(${title}, ${state})`);
            const doc = {title, state};
            const result = await Db.getDb().collection(Country.$collection).insertOne(doc);
            return result.insertedId.toHexString();
        } catch (err) {
            throw err;
        }
    }
}