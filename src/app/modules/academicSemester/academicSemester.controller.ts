import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterFilterableFields } from './academicSemester.constants';
import { AcademicSemesterService } from './academicSemester.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.create({ ...req.body });
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic semester created successfully!!',
    data: result,
  });
});

const readMultiple = catchAsync(async (req: Request, res: Response) => {
  const filters = pick({ ...req.query }, academicSemesterFilterableFields);
  const pgOptions = pick({ ...req.query }, paginationFields);

  const result = await AcademicSemesterService.readMultiple(filters, pgOptions);
  sendResponse<AcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters retrieves successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const readSingle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicSemesterService.readSingle(id);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single academic semester retrieve success!!',
    data: result,
  });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await AcademicSemesterService.update(id, { ...data });
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic Semester updated success!!',
    data: result,
  });
});

const deleting = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.deleting(req.params.id);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester deleting success!!',
    data: result,
  });
});

export const AcademicSemesterController = {
  create,
  readMultiple,
  readSingle,
  update,
  deleting,
};
