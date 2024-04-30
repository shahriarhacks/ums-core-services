import { AcademicFaculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { academicFacultySearchableFields } from './academicFaculty.constants';
import { IAcademicFacultyFilterRequest } from './academicFaculty.interface';

const create = async (data: AcademicFaculty): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data,
  });
  return result;
};

const readMultiple = async (
  filters: IAcademicFacultyFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { limit, page, sortBy, sortOrder, skip } =
    paginationHelpers.calculatePagination(options);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: academicFacultySearchableFields.map(field => ({
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

  const whereConditions: Prisma.AcademicFacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const total = await prisma.academicFaculty.count({
    where: whereConditions,
  });

  const result = await prisma.academicFaculty.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const readSingle = async (id: string): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const update = async (
  id: string,
  payload: Partial<AcademicFaculty>
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleting = async (id: string): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.delete({
    where: { id },
  });
  return result;
};

export const AcademicFacultyService = {
  create,
  readMultiple,
  readSingle,
  update,
  deleting,
};
