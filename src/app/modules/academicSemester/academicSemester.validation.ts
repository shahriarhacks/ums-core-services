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
const update = z.object({
  body: z.object({
    title: z
      .enum([...academicSemesterTitles] as [string, ...string[]], {})
      .optional(),
    year: z.number({}).optional(),
    code: z
      .enum([...academicSemesterCodes] as [string, ...string[]], {})
      .optional(),
    startMonth: z
      .enum([...academicSemesterMonths] as [string, ...string[]], {})
      .optional(),
    endMonth: z
      .enum([...academicSemesterMonths] as [string, ...string[]], {})
      .optional(),
  }),
});

export const AcademicSemesterValidation = { create, update };
