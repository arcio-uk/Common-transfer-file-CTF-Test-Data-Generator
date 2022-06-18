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

