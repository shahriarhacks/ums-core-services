import { Faculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultyFilterableFields } from './faculty.constants';
import { FacultyService } from './faculty.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.create({ ...req.body });
  sendResponse<Faculty>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Faculty created success!!',
    data: result,
  });
});

const readMultiple = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);
  const pgOptions = pick(req.query, paginationFields);
  const result = await FacultyService.readMultiple(filters, pgOptions);
  sendResponse<Faculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties retrieve success!!',
    meta: result.meta,
    data: result.data,
  });
});

const readSingle = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.readSingle(req.params.id);
  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieve success!!',
    data: result,
  });
});

export const FacultyController = { create, readMultiple, readSingle };
