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

const readAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick({ ...req.query }, academicSemesterFilterableFields);
  const pgOptions = pick({ ...req.query }, paginationFields);
  // console.log('filters: ', filters);
  // console.log('Pagination Options: ', pgOptions);
  const result = await AcademicSemesterService.readAll(filters, pgOptions);
  sendResponse<AcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters retrieves successfully!',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademicSemesterController = { create, readAll };
