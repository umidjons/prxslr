import * as debug from 'debug';
import Db from '../Db';
import User from '../models/User';
import Country from '../models/Country';
import Product from '../models/Product';
import Order from '../models/Order';
import Proxies from '../models/Proxies';
import { ICart } from '../interfaces';

const log = debug('api:Populate');
log.log = console.log.bind(console);

class Populate {
    private admin;
    private user1;
    private user2;

    private country1;
    private country2;
    private country3;

    private product1;
    private product2;
    private product3;

    private order1;
    private order2;
    private order3;

    private proxy1;
    private proxy2;
    private proxy3;

    async users() {
        try {
            log('users()');
            this.admin = await new User().create('admin@prx.uz', '123', User.ROLE_ADMIN);
            this.user1 = await new User().create('user1@prx.uz', '123', User.ROLE_USER);
            this.user2 = await new User().create('user2@prx.uz', '123', User.ROLE_USER);
            log('users() Done.');
        } catch (e) {
            log('users()', e);
        }
    }

    async countries() {
        try {
            log('countries()');
            this.country1 = await new Country().create('Russia', Country.STATE_ACTIVE);
            this.country2 = await new Country().create('USA', Country.STATE_ACTIVE);
            this.country3 = await new Country().create('Germany', Country.STATE_DISABLED);
            log('countries() Done.');
        } catch (e) {
            log('countries()', e);
        }
    }

    async products() {
        try {
            log('products()');
            this.product1 = await new Product().create(this.admin, 'Proxy 1', 8, Product.TYPE_IPv6, ['http', 'https'], this.country1);
            this.product2 = await new Product().create(this.admin, 'Proxy 2', 9, Product.TYPE_IPv4, ['http', 'https', 'socks'], this.country2);
            this.product3 = await new Product().create(this.admin, 'Proxy 3', 12, Product.TYPE_IPv4_SHARED, ['http', 'https', 'socks'], this.country2);
            log('products() Done.');
        } catch (e) {
            log('products()', e);
        }
    }

    async orders() {
        try {
            log('orders()');
            const cart1: ICart = {
                count: 10,
                price: 85,
                items: [
                    {
                        product: this.product1,
                        count: 5,
                        duration: 30
                    },
                    {
                        product: this.product2,
                        count: 5,
                        duration: 30
                    }
                ]
            };
            this.order1 = await new Order().create(this.user1, cart1);

            const cart2: ICart = {
                count: 3,
                price: 33,
                items: [
                    {
                        product: this.product3,
                        count: 2,
                        duration: 30
                    },
                    {
                        product: this.product2,
                        count: 1,
                        duration: 30
                    }
                ]
            };
            this.order2 = await new Order().create(this.user2, cart2);

            const cart3: ICart = {
                count: 8,
                price: 76,
                items: [
                    {
                        product: this.product3,
                        count: 3,
                        duration: 60
                    },
                    {
                        product: this.product1,
                        count: 5,
                        duration: 90
                    }
                ]
            };
            this.order3 = await new Order().create(this.user2, cart3);
            log('orders() Done.');
        } catch (e) {
            log('orders()', e);
        }
    }

    async proxies() {
        try {
            log('proxies()');
            this.proxy1 = await new Proxies().create(this.user1, ['http', 'https'], '127.0.0.1', 1234, 'user111', 'XaLdOe', 30, this.country1, this.order1);
            this.proxy2 = await new Proxies().create(this.user1, ['http', 'https', 'socks'], '127.0.0.2', 2514, 'user222', 'mApQuN', 30, this.country2, this.order1);
            this.proxy3 = await new Proxies().create(this.user2, ['http', 'https', 'socks'], '127.0.0.3', 1620, 'user333', 'XApQuy', 60, this.country2, this.order2);
            log('proxies() Done.');
        } catch (e) {
            log('proxies()', e);
        }
    }
}

async function main() {
    try {
        await Db.connect();
        const pop = new Populate();
        await pop.users();
        await pop.countries();
        await pop.products();
        await pop.orders();
        await pop.proxies();
        await Db.getClient().close();
    } catch (e) {
        log('main()', e);
    }
}

main();