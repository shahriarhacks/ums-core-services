import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.get('/', AcademicFacultyController.readMultiple);

router.post(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AcademicFacultyValidation.create),
  AcademicFacultyController.create
);

router.get('/:id', AcademicFacultyController.readSingle);

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.update),
  AcademicFacultyController.update
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicFacultyController.deleting
);

export const AcademicFacultyRouter = router;
