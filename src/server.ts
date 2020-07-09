import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';

import './database';

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes);

app.listen(3333, () => {
	console.log('------------------ Server started on port 3333 ');
});
