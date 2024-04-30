import {
  AcademicDepartment,
  Prisma,
  AcademicDepartment as acd,
} from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { academicDepartmentSearchableFields } from './academicDepartment.constants';
import { IAcademicDepartmentFilterRequest } from './academicFaculty.interface';

const create = async (data: acd): Promise<acd> => {
  const result = await prisma.academicDepartment.create({
    data,
    include: {
      academicFaculty: true,
    },
  });
  return result;
};

const readMultiple = async (
  filters: IAcademicDepartmentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: academicDepartmentSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions: Prisma.AcademicDepartmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const total = await prisma.academicDepartment.count({
    where: whereConditions,
  });

  const result = await prisma.academicDepartment.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
    include: {
      academicFaculty: true,
    },
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const readSingle = async (id: string): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: { id },
    include: {
      academicFaculty: true,
    },
  });
  return result;
};

const update = async (
  id: string,
  payload: Partial<AcademicDepartment>
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleting = async (id: string): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.delete({
    where: { id },
  });
  return result;
};

export const AcademicDepartmentService = {
  create,
  readMultiple,
  readSingle,
  update,
  deleting,
};
