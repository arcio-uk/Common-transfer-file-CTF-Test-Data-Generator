import { faker } from '@faker-js/faker';
import { CHANCE_OF_OPTIONAL_VARS } from 'config';
import * as fs from 'fs';
import { createEntry, CSVtoArray } from 'misc';
import * as readline from 'readline';

faker.locale = 'gb';

const CreateSchoolJSON = async (amount: number | undefined) => {
  const csvStream = fs.createReadStream('src/data/edubasealldata20220612.csv');

  const rl = readline.createInterface({
    input: csvStream,
    crlfDelay: Infinity,
  });

  let format;
  const entries = [];
  for await (const line of rl) {
    if (!format) {
      format = CSVtoArray(line);
      console.log(JSON.stringify(format));
    } else {
      entries.push(createEntry(line, format));
    }
    if (amount && entries.length > amount) break;
  }
  fs.writeFile('src/data/edubasealldata.json', JSON.stringify(entries, null, 2), () => console.log('File written!'));
};

const optionalRand = (arg: any) => (Math.random() < CHANCE_OF_OPTIONAL_VARS ? arg : undefined);

const getRandomTitle = (gender: boolean): string => {
  const male = ['Mr', 'Sir', 'Lord'];
  const female = ['Mrs', 'Ms', 'Miss', 'Lady'];
  const neutral = ['Rev', 'Fr', 'Dr', 'Prof', 'Hon'];

  const available = [...neutral, ...gender ? male : female];

  return available[Math.floor(Math.random() * available.length)];
};

export const Relationships = {
  CAR: { name: 'Carer', freq: 5 },
  CHM: { name: 'Childminder', freq: 3 },
  DOC: { name: 'Doctor', freq: 1 },
  FAM: { name: 'Other family member', freq: 15 },
  FOF: { name: 'Foster Father', freq: 1, gender: true },
  FOM: { name: 'Foster Mother', freq: 1, gender: false },
  HTC: { name: 'Head Teacher', freq: 1 },
  OTH: { name: 'Other Contact', freq: 1 },
  PAF: { name: 'Father', freq: 25, gender: true },
  PAM: { name: 'Mother', freq: 25, gender: false },
  REL: { name: 'Other Relative', freq: 10 },
  RLG: { name: 'Religious/Spiritual Contact', freq: 1 },
  STF: { name: 'Step Father', freq: 15, gender: true },
  STM: { name: 'Step Mother', freq: 15, gender: false },
  SWR: { name: 'Social Worker', freq: 3 },
  TCH: { name: 'Teacher', freq: 1 },
};

const getRelationship = (gender: boolean) : string => {
  const all: string[] = Object.entries(Relationships).reduce((arr: string[], key) => {
    if ('gender' in key[1]) {
      if (key[1].gender !== gender) return arr;
    }
    arr.push(...[...Array(key[1].freq).keys()].map(() => key[0]));
    return arr;
  }, []);

  return all[Math.floor(Math.random() * all.length)];
};

export type Address = {
  BS7666Address?: {
    SAON?: string;// Flat, apartment name or number or other sub-division of a dwelling
    PAON: string;// Dwelling name and/or number
    Street: string;
    // At least one of Locality, Town and AdministrativeArea must be present
    Locality?: string;
    Town?: string;
    PostTown?: string; // Post Office usually assigns these based on Sorting Office
    AdministrativeArea?: string;
    UniquePropertyReferenceNumber?: number;
  },
  AddressLines?: {
    AddressLine1: string;
    AddressLine2?: string;
    AddressLine3?: string;
    AddressLine4?: string;
    AddressLine5?: string;
  },
  County?: string;
  PostCode?: string;
  Zip?: string;
  Country?: string;
  Easting?: number;
  Northing?: number;
};

const generateAddress = () => {
  // BS7666Address or the standard AddressLines
  const addressType = Math.random() > 0.5;
  const address = {};
  if (addressType) {
    address.BS7666Address = {

    };
  } else {

  }
  return address;
};

export {
  CreateSchoolJSON,
  optionalRand,
  getRandomTitle,
  getRelationship,
};
