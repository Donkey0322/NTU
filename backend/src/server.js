import express from 'express';
import db from './db';
import routes from './routes'; 
import cors from 'cors';

db.connect();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 4040;
app.get('/', (req, res) => {
 res.send('Hello, World!')
});
app.listen(port, () =>
 console.log(`Example app listening on port ${port}!`),
);
app.use('/', routes);
