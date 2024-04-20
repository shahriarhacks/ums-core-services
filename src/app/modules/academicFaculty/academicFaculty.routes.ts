import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.get('/', AcademicFacultyController.readMultiple);

router.post(
  '/create',
  validateRequest(AcademicFacultyValidation.create),
  AcademicFacultyController.create
);

router.get('/:id', AcademicFacultyController.readSingle);

export const AcademicFacultyRouter = router;
