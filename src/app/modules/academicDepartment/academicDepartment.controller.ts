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

const readSingle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.readSingle(id);
  sendResponse<AcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department retrieve success!!',
    data: result,
  });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await AcademicDepartmentService.update(id, { ...data });
  sendResponse<AcademicDepartment>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic Department updated success!!',
    data: result,
  });
});

const deleting = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicDepartmentService.deleting(req.params.id);
  sendResponse<AcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department deleting success!!',
    data: result,
  });
});

export const AcademicDepartmentController = {
  create,
  readMultiple,
  readSingle,
  update,
  deleting,
};
