import { Router } from 'express';
const routes = Router();

routes.get('/', (request, response) => {
	const data = { message: "rota bombou" };
	return response.json(data);
});

export default routes;
