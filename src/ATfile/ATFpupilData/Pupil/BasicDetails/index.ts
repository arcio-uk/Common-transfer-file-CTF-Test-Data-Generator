import { faker } from '@faker-js/faker';
import { Header } from 'ATfile/Header';
import { createUPN } from 'misc/generators';
import {
  createNCyearActual, createSuppInfo, getEthnicity, getLanguage, getLanguageType, getServiceChild, optionalRand, SuppInfo,
} from 'misc/misc';

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
  MedicalFlag?: boolean | number;
  Disabilities?: {
    Disability: string[];
  } | string;
  SuppInfo?: SuppInfo;
};

const getDisabilities = (): BasicDetails['Disabilities'] => {
  if (Math.random() < 0.05) {
    const disabilities = ['NCOL', 'NONE', 'MOB', 'HAND', 'PC', 'EAT', 'MED', 'INC', 'COMM', 'LD', 'HEAR', 'VIS', 'BEH', 'CON', 'AUT', 'DDA', 'OTH'];
    return disabilities[Math.floor(Math.random() * disabilities.length)];
  }
  return Math.random() > 0.1 ? 'NONE' : 'NOCL';
};

const create = (header: Header, DOB: string): BasicDetails => {
  const Ethnicity = optionalRand(getEthnicity());

  const Type = [...Array(Math.ceil(Math.random() * 3))].map(() => ({
    LanguageType: getLanguageType(),
    Language: getLanguage(),
  }));

  const MedicalFlag = () => {
    if (Math.random() > 0.5) {
      return Math.random() > 0.5 ? 0 : 1;
    }
    return Math.random() > 0.5;
  };

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
    ServiceChild: optionalRand(getServiceChild()),
    MedicalFlag: optionalRand(MedicalFlag()),
    Disabilities: optionalRand(getDisabilities()),
    SuppInfo: optionalRand(createSuppInfo()),
  };
};

export { create };
