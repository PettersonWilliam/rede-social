import express from 'express';
import routes from './server/routes/index.js';

const app = express();

app.use(express.json());
app.use(routes);

export default app;
