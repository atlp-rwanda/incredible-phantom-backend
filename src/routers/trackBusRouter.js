import { Router } from 'express';
const BusRouter = Router();
BusRouter.route('/trackBuses').get();

export default BusRouter;
