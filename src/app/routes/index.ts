import express, { Router } from 'express';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.routes';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.routes';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.routes';
import { FacultyRouter } from '../modules/faculty/faculty.routes';

type IModuleRouter = { path: string; route: Router };

const router = express.Router();

const moduleRoutes: IModuleRouter[] = [
  // ... routes
  {
    path: '/academic-semesters',
    route: AcademicSemesterRouter,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRouter,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRouter,
  },
  {
    path: '/faculty',
    route: FacultyRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
