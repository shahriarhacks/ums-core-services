import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';
const router = Router();

router.get('/', FacultyController.readMultiple);

router.post(
  '/create',
  validateRequest(FacultyValidation.create),
  FacultyController.create
);

router.get('/:id', FacultyController.readSingle);

export const FacultyRouter = router;
