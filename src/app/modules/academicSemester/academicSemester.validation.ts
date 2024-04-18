import { z } from 'zod';
import { nbr, str } from '../../../constants/validationSimilar';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constants';

const create = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: `Title ${str}`,
    }),
    year: z.number({
      required_error: `Year ${nbr}`,
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
      required_error: `Code ${str}`,
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: `Start Month ${str}`,
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: `End Month ${str}`,
    }),
  }),
});

export const AcademicSemesterValidation = { create };
