import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.get('/', AcademicSemesterController.readAll);

router.post(
  '/create',
  validateRequest(AcademicSemesterValidation.create),
  AcademicSemesterController.create
);

export const AcademicSemesterRouter = router;
