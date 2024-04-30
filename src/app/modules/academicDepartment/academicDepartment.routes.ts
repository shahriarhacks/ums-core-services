import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = Router();

router.get('/', AcademicDepartmentController.readMultiple);

router.post(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AcademicDepartmentValidation.create),
  AcademicDepartmentController.create
);

router.get('/:id', AcademicDepartmentController.readSingle);

router.patch(
  '/:id',
  validateRequest(AcademicDepartmentValidation.update),
  AcademicDepartmentController.update
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicDepartmentController.deleting
);

export const AcademicDepartmentRouter = router;
