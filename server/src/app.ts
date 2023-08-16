import path from 'path';
import express from 'express';
import Router from 'express-promise-router';
import config from './config/config';

const app = express();
const router = Router();
app.use(`/api/v${config.VERSION_MAJOR}`, router);

router.use(express.static(path.join(__dirname, 'public')));

router.use(express.json());

export default app;
