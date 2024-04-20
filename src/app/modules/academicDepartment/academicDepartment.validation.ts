import { z } from 'zod';
import { str } from '../../../constants/validationSimilar';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: `Title ${str}`,
    }),
    academicFacultyId: z.string({
      required_error: `Academic Faculty ID ${str}`,
    }),
  }),
});

export const AcademicDepartmentValidation = { create };
