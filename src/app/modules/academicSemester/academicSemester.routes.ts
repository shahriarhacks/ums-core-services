import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.get('/', AcademicSemesterController.readMultiple);

router.post(
  '/create',
  validateRequest(AcademicSemesterValidation.create),
  AcademicSemesterController.create
);

router.get('/:id', AcademicSemesterController.readSingle);

export const AcademicSemesterRouter = router;
