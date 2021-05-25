# vib-backend

A backend server using graphql, nodejs, express and mongodb
Before start, please make sure you have mongodb installed (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

1. Clone repository 
```bash
git clone https://github.com/tungduonghgg123/vib-backend
```
2. cd into project directory
```bash
cd vib-backend
```
3. Start mongoDB server. If success, you should see the url of the database in the terminal. Then, copy that to `url` field in `src/mongoDB/constants`
```bash
mongo
```
3.1. Create database and collection:
```
node src/mongoDB/create_db.js
```
```
node src/mongoDB/create_collection.js
```
4. Start the server
``` 
npm start
```
5. If success, copy `http://localhost:4000/graphql` to vib-hackathon repo `src/model/index.js`
