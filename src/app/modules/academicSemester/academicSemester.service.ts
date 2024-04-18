/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicSemester, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../prisma/prisma';
import { academicSemesterSearchableFields } from './academicSemester.constants';
import { IAcademicSemesterFiltersFields } from './academicSemester.interface';

const create = async (data: AcademicSemester): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data,
  });
  return result;
};

const readAll = async (
  filters: IAcademicSemesterFiltersFields,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: academicSemesterSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // if (Object.keys(filtersData).length > 0) {
  //   andConditions.push({
  //     AND: Object.keys(filtersData).map(key => ({
  //       [key]: {
  //         equals: (filtersData as any)[key],
  //       },
  //     })),
  //   });
  // }
  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions: Prisma.AcademicSemesterWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicSemester.findMany({
    where: whereConditions,
    skip,
    take: limit,
  });
  const total = await prisma.academicSemester.count({
    where: whereConditions,
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
export const AcademicSemesterService = { create, readAll };
