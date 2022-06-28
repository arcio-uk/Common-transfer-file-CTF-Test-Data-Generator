import { faker } from '@faker-js/faker';
import { Header } from 'ATfile/Header';
import { createUPN } from 'misc/generators';
import {
  createNCyearActual, getEthnicity, getLanguage, getLanguageType, optionalRand, SuppInfo,
} from 'misc/misc';
import moment from 'moment';

faker.locale = 'en_GB';

export type BasicDetails = {
  UPN?: string;// N00002
  PreferredSurname?: string;
  FormerSurname?: string;
  PreferredForename?: string;
  MiddleNames?: string;
  NCyearActual?: string;
  Ethnicity?: string;
  EthnicitySource?: string;
  Languages?: { // not an array?
    Type: {
      LanguageType: string;
      Language: string;
    }[];
  };
  ServiceChild?: string;
  MedicalFlag?: boolean;
  Disabilities?: {
    Disability: string[];
  };
  SuppInfo?: SuppInfo;
};

const create = (header: Header, DOB: string): BasicDetails => {
  const Ethnicity = optionalRand(getEthnicity());

  const Type = [...Array(Math.ceil(Math.random() * 3))].map(() => ({
    LanguageType: getLanguageType(),
    Language: getLanguage(),
  }));

  return {
    UPN: optionalRand(createUPN(header)),
    PreferredSurname: optionalRand(faker.name.lastName()),
    FormerSurname: optionalRand(faker.name.lastName()),
    PreferredForename: optionalRand(faker.name.firstName()),
    MiddleNames: optionalRand([...Array(Math.floor(Math.random() * 3) + 1).keys()].map(() => faker.name.firstName()).join(' ')),
    NCyearActual: optionalRand(createNCyearActual(DOB)),
    Ethnicity,
    EthnicitySource: Ethnicity && Math.random() > 0.7 ? 'C' : 'P',
    Languages: optionalRand({ Type }),
  };
};

export { create };
