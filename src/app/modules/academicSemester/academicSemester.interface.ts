export type IAcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemesterTitles = 'Autumn' | 'Fall' | 'Spring';

export type IAcademicSemesterCodes = '01' | '02' | '03';

export type IAcademicSemesterFiltersFields = {
  searchTerm?: string;
};
