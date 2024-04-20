import { z } from 'zod';
import { bloodGroups, gender } from '../../../constants/common';
import { str } from '../../../constants/validationSimilar';

const create = z.object({
  body: z.object({
    studentId: z.string({ required_error: `Student ID ${str}` }),
    firstName: z.string({ required_error: `First Name ${str}` }),
    middleName: z.string().optional(),
    lastName: z.string({ required_error: `Last Name ${str}` }),
    profileImage: z.string().optional(),
    email: z.string({ required_error: `Email ${str}` }),
    contactNo: z.string({
      required_error: `Contact No ${str}`,
    }),
    dateOfBirth: z.string({
      required_error: `Date of Birth ${str}`,
    }),
    gender: z.enum([...gender] as [string, ...string[]], {
      required_error: `Gender ${str}`,
    }),
    bloodGroup: z.enum([...bloodGroups] as [string, ...string[]]).optional(),
    academicSemesterId: z.string({
      required_error: `Academic Semester ID ${str}`,
    }),
    academicFacultyId: z.string({
      required_error: `Academic Faculty ID ${str}`,
    }),
    academicDepartmentId: z.string({
      required_error: `Academic Department ID ${str}`,
    }),
  }),
});

export const StudentValidation = { create };
