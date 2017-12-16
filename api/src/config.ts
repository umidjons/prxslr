export default class Config {
    static readonly DB_URI = 'mongodb://localhost:27020';
    static readonly DB_NAME = 'prxdb';
    static readonly DB_SESSION_COLLECTION = 'sessions';
    static readonly SESSION_SECRET = '#123@_&^%-+Some[:]Random(:)String$';
    static readonly BCRYPT_SALT_ROUND = 13;
}