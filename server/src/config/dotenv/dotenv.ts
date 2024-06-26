import path from 'path';
import dotenv from 'dotenv';

const CONFIG_PATH = path.join(__dirname, '..', '..', '..', '.env');
dotenv.config({ path: CONFIG_PATH });

export { };
