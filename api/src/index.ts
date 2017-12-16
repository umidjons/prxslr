import * as debug from 'debug';
import app from './App';
import Db from './Db';

const log = debug('api:app');

const port = process.env.PORT || 3000;

app.listen(port, async (err) => {
    if (err) {
        return console.error(err);
    }

    app.db = await Db.connect();

    log(`Server is listening on ${port}`);
});