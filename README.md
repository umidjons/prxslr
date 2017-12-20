# PRX SLR

## Development Mode

### Build Fron-End

```bash
cd ui
ng build
# or in watch mode
ng build -w
```

### Run Nginx & Mongo

```bash
docker-compose up -d
```

If database is empty, then create at least one user.
For example:

```bash
docker exec -it prx2_mongo_1 mongo
use prxdb
db.users.insert({email: 'admin@test.tt', password: '123', state: 1})
```

### Run Back-End 

```bash
cd api
npm run dev
```

### Populate collections with sample data

```bash
DEBUG=* node api/dist/scripts/populate.js
```
