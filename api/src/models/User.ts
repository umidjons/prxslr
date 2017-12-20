import Db from '../Db';
import * as debug from 'debug';
import * as bcrypt from 'bcrypt';
import Config from '../config';

const log = debug('api:User');

export default class User {

    static readonly STATE_DELETED = -1;
    static readonly STATE_DISABLED = 0;
    static readonly STATE_ACTIVE = 1;

    static readonly ROLE_USER = 'user';
    static readonly ROLE_ADMIN = 'admin';

    static readonly $collection = 'users';

    async findByEmail(email: string) {
        log(`findByEmail(${email})`);
        return await Db.getDb().collection(User.$collection).findOne({email: email, state: User.STATE_ACTIVE});
    }

    async findById(id: string) {
        return await Db.getDb().collection(User.$collection).findOne({_id: Db.ObjectId(id)});
    }

    async create(email: string, password: string, role: string = User.ROLE_USER): Promise<string> {
        try {
            log(`create(${email}, ${password})`);
            const salt = await bcrypt.genSalt(Config.BCRYPT_SALT_ROUND);
            const passwordHash = await bcrypt.hash(password.trim(), salt);

            const doc = {
                email: email,
                password: passwordHash,
                salt: salt,
                state: User.STATE_ACTIVE, // todo: Change default user status to disabled and activate it after confirming email
                created_at: new Date(),
                deleted_at: null,
                role: role
            };

            const result = await Db.getDb().collection(User.$collection).insertOne(doc);
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