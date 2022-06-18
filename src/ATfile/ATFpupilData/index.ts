import { faker } from '@faker-js/faker';
import { SuppInfo } from 'ATfile/Header/SuppInfo';

export type ATFpupilData = {
  // https://docs.google.com/spreadsheets/d/1dFoRhl0pWDWaDoLBpHwiDPD4JzBdqKnZmp9hUG0YZnk/edit#gid=1461571706&range=E132
  ApplicationReference: string;
  UPN?: string;
  UniqueLearnerNumber?: number;
  UCI?: string;
  Surname: string;
  Forename: string;
  DOB: string;
  Gender: string;
  BasicDetails?: any;
  FSMhistory?: any;
  LookedAfter?: any;
  SENhistory?: any;
  Admissions?: any;
  Address?: any;
  Phones?: any;
  Email?: string;
  Contacts?: any;
  SchoolHistory?: any;
  SuppInfo?: SuppInfo;
};

const create = (): ATFpupilData => ({
  ApplicationReference: '420-1969-09-K-123456' // TODO: do this properly
  UPN: optionalRand('999999999999A'), // TODO: make a UPN generator
  Forename: faker.name.firstName(),
  Surname: faker.name.lastName(),
  DOB: faker.date.betweens('1970-01-01', '2006-01-01'),
  gender: Math.random() > 0.5 ? 'M' : 'F',
});

export { create };
