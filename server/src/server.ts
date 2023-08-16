import './config/dotenv';
import app from './app';
import { PORT } from './config/constants';

const server = app.listen(PORT, () => console.log(`[GuessTheWord] server running: ${process.env.NODE_ENV} mode on port ${PORT}`));

export default server;
