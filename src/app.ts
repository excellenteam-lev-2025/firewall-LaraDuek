import express, {Application, Request, Response, NextFunction} from 'express';
import { config } from './config/env';

import ipRoutes from './routes/ip.routes';
import urlRoutes from './routes/url.routes';
import portRoutes from './routes/port.routes';
import ruleRoutes from './routes/rule.routes';


export const app: Application = express();
app.use(express.json());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({ status: 'ok', message: 'Firewall API running' });
});

app.use('/api/firewall', ipRoutes);
app.use('/api/firewall', urlRoutes);
app.use('/api/firewall', portRoutes);
app.use('/api/firewall', ruleRoutes);

