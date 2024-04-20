import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = Router();

router.get('/', StudentController.readMultiple);

router.post(
  '/create',
  validateRequest(StudentValidation.create),
  StudentController.create
);

router.get('/:id', StudentController.readSingle);

export const StudentRouter = router;
