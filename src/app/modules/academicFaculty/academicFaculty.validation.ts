import { z } from 'zod';
import { str } from '../../../constants/validationSimilar';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: `Title ${str}`,
    }),
  }),
});
const update = z.object({
  body: z.object({
    title: z.string({}).optional(),
  }),
});

export const AcademicFacultyValidation = { create, update };
