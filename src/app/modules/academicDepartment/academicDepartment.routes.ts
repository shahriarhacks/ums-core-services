import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = Router();

router.get('/', AcademicDepartmentController.readMultiple);

router.post(
  '/create',
  validateRequest(AcademicDepartmentValidation.create),
  AcademicDepartmentController.create
);

export const AcademicDepartmentRouter = router;
