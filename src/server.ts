import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import './database';
import AppError from './errors/AppError';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

// global error handler
app.use(
	(
		err: Error,
		request: express.Request,
		response: express.Response,
		_: express.NextFunction,
	) => {
		if (err instanceof AppError) {
			return response.status(err.statusCode).json({
				status: 'error',
				message: err.message,
			});
		}

		console.log('Error: ', err);
		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
		});
	},
);

app.listen(3333, () => {
	console.log('------------------ Server started on port 3333 ');
});
