import { AcademicFaculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import {
  academicFacultyFilterableFields,
  academicFacultySearchableFields,
} from './academicFaculty.constants';
import { AcademicFacultyService } from './academicFaculty.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicFacultyService.create({ ...req.body });
  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic faculty created success!!',
    data: result,
  });
});

const readMultiple = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const pgOptions = pick(req.query, academicFacultySearchableFields);
  const result = await AcademicFacultyService.readMultiple(filters, pgOptions);
  sendResponse<AcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculties retrieves success!!',
    meta: result.meta,
    data: result.data,
  });
});

const readSingle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.readSingle(id);

  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single academic faculty retrieve success!!',
    data: result,
  });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await AcademicFacultyService.update(id, { ...data });
  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic Faculty updated success!!',
    data: result,
  });
});

const deleting = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicFacultyService.deleting(req.params.id);
  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty deleting success!!',
    data: result,
  });
});

export const AcademicFacultyController = {
  create,
  readMultiple,
  readSingle,
  update,
  deleting,
};
