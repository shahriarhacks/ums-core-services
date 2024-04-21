import { Prisma, Student } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { studentSearchableFields } from './student.constants';
import { IStudentFilterRequest } from './student.interface';

const create = async (data: Student): Promise<Student> => {
  const result = await prisma.student.create({
    data,
    include: {
      academicSemester: true,
      academicFaculty: true,
      academicDepartment: true,
    },
  });
  return result;
};

const readMultiple = async (
  filters: IStudentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Student[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: studentSearchableFields.map(field => ({
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

  const whereConditions: Prisma.StudentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.student.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
    include: {
      academicSemester: true,
      academicFaculty: true,
      academicDepartment: true,
    },
  });
  const total = await prisma.student.count({
    where: whereConditions,
  });
  return {
    meta: {
      limit,
      page,
      total,
    },
    data: result,
  };
};

const readSingle = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({
    where: {
      id,
    },
    include: {
      academicSemester: true,
      academicFaculty: true,
      academicDepartment: true,
    },
  });
  return result;
};

const update = async (
  id: string,
  payload: Partial<Student>
): Promise<Student> => {
  const result = await prisma.student.update({
    where: {
      id,
    },
    data: payload,
    include: {
      academicSemester: true,
      academicFaculty: true,
      academicDepartment: true,
    },
  });
  return result;
};

const deleting = async (id: string): Promise<Student> => {
  const result = await prisma.student.delete({
    where: { id },
    include: {
      academicSemester: true,
      academicFaculty: true,
      academicDepartment: true,
    },
  });
  return result;
};

export const StudentService = {
  create,
  readMultiple,
  readSingle,
  update,
  deleting,
};
