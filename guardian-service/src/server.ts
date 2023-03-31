import App from '@/app';
import validateEnv from '@utils/validateEnv';
import GuardiansRoute from './routes/guardians.route';

validateEnv();

const app = new App([new GuardiansRoute()]);

app.listen();
