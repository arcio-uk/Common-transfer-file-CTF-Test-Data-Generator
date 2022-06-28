import { faker } from '@faker-js/faker';
import { Header } from 'ATfile/Header';
import { Contact, create as cContact } from 'ATfile/ATFpupilData/Pupil/Contacts';
import { createApplicationReference, createUniqueLearnerNumber, createUPN } from 'misc/generators';
import {
  optionalRand, SuppInfo, createSuppInfo as cSuppInfo, Address, generateAddress,
} from 'misc/misc';
import moment from 'moment';
import { Phones, create as cPhones } from 'ATfile/ATFpupilData/Pupil/Phones';
import { Admissions, create as cAdmissions } from 'ATfile/ATFpupilData/Pupil/Admissions';
import { SENhistory, create as cSENhistory } from 'ATfile/ATFpupilData/Pupil/SENhistory';
import { SchoolHistory, create as cSchoolHistory } from 'ATfile/ATFpupilData/Pupil/SchoolHistory';
import { LookedAfter, create as cLookedAfter } from 'ATfile/ATFpupilData/Pupil/LookedAfter';
import { FSMhistory, create as cFSMhistory } from 'ATfile/ATFpupilData/Pupil/FSMhistory';
import { BasicDetails } from 'ATfile/ATFpupilData/Pupil/BasicDetails';

faker.locale = 'en_GB';

export type Pupil = {
  // https://docs.google.com/spreadsheets/d/1dFoRhl0pWDWaDoLBpHwiDPD4JzBdqKnZmp9hUG0YZnk/edit#gid=1461571706&range=E132
  ApplicationReference: string;
  UPN?: string;
  UniqueLearnerNumber?: number;
  UCI?: string;
  Surname: string;
  Forename: string;
  DOB: string;
  Gender: string;
  BasicDetails?: BasicDetails;
  FSMhistory?: FSMhistory;
  LookedAfter?: LookedAfter;
  SENhistory?: SENhistory;
  Admissions?: Admissions;
  Address?: Address;
  Phones?: Phones;
  Email?: string;
  Contacts?: {
    Contact: Contact[];
  };
  SchoolHistory?: SchoolHistory;
  SuppInfo?: SuppInfo;
};

const create = (header: Header): Pupil => {
  const DOB = moment(faker.date.betweens(`${header.SourceSchool.AcademicYear - 3}-01-01`, `${header.SourceSchool.AcademicYear - 3}-12-31`)[0]).format('DD/MM/YYYY');
  return {
    ApplicationReference: createApplicationReference(header),
    UPN: optionalRand(createUPN(header)), // TODO: make a UPN generator
    UniqueLearnerNumber: optionalRand(createUniqueLearnerNumber()),
    Forename: faker.name.firstName(),
    Surname: faker.name.lastName(),
    DOB,
    Gender: Math.random() > 0.5 ? 'M' : 'F',

    FSMhistory: cFSMhistory(DOB),
    LookedAfter: optionalRand(cLookedAfter()),
    SENhistory: optionalRand(cSENhistory(DOB)),
    Admissions: optionalRand(cAdmissions()),
    Address: optionalRand(generateAddress()),
    Phones: optionalRand(cPhones()),
    Email: optionalRand(faker.internet.email()),
    /*
      at Arcio, we're not lazy, we're progressive,
      so you can have many fathers, mothers and other contacts!
    */
    Contacts: {
      Contact: [...Array(Math.floor(Math.random() * 3) + 1)].map(() => cContact()),
    },

    SchoolHistory: optionalRand(cSchoolHistory(DOB)),
    SuppInfo: optionalRand(cSuppInfo()),
  };
};

export { create };
