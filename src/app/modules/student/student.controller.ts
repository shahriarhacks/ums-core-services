import { Student } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constants';
import { StudentService } from './student.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.create({ ...req.body });
  sendResponse<Student>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student created success!!',
    data: result,
  });
});

const readMultiple = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const pgOptions = pick(req.query, paginationFields);

  const result = await StudentService.readMultiple(filters, pgOptions);
  sendResponse<Student[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students retrieve success!!',
    meta: result.meta,
    data: result.data,
  });
});

const readSingle = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.readSingle(req.params.id);
  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieve success!!',
    data: result,
  });
});

export const StudentController = { create, readMultiple, readSingle };
