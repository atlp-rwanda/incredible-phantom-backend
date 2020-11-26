import { Router } from 'express';
import { createRole, ReadRole, UpdateRole, DeleteRole } from '../controllers/RolesController';

const rolesRouter = Router();

rolesRouter.route('/').post(createRole).get(ReadRole);
rolesRouter.route('/:id').patch(UpdateRole).delete(DeleteRole);

export default rolesRouter;