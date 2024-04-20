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

router.get('/:id', AcademicDepartmentController.readSingle);

export const AcademicDepartmentRouter = router;
