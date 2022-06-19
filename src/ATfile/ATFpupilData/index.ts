import { faker } from '@faker-js/faker';
import { Header } from 'ATfile/Header';
import { SuppInfo } from 'ATfile/Header/SuppInfo';
import { createApplicationReference, createUPN } from 'misc/generators';
import { optionalRand } from 'misc/misc';
import moment from 'moment';

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

const create = (header: Header): ATFpupilData => ({
  ApplicationReference: createApplicationReference(header),
  UPN: optionalRand(createUPN(header)), // TODO: make a UPN generator
  Forename: faker.name.firstName(),
  Surname: faker.name.lastName(),
  DOB: moment(faker.date.betweens(`${header.SourceSchool.AcademicYear - 3}-01-01`, `${header.SourceSchool.AcademicYear - 3}-12-31`)[0]).format('DD/MM/YYYY'),
  Gender: Math.random() > 0.5 ? 'M' : 'F',
});

export { create };
