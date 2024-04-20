import { AcademicDepartment } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicDepartmentFilterableFields } from './academicDepartment.constants';
import { AcademicDepartmentService } from './academicDepartment.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicDepartmentService.create({ ...req.body });
  sendResponse<AcademicDepartment>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic department created success!!',
    data: result,
  });
});

const readMultiple = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const pgOptions = pick(req.query, paginationFields);

  const result = await AcademicDepartmentService.readMultiple(
    filters,
    pgOptions
  );
  sendResponse<AcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic departments retrieve success!!',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademicDepartmentController = { create, readMultiple };
