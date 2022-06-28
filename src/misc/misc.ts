import { faker } from '@faker-js/faker';
import { CHANCE_OF_OPTIONAL_VARS } from 'config';
import * as fs from 'fs';
import { createEntry, CSVtoArray } from 'misc';
import * as readline from 'readline';
import Chance from 'chance';
import moment from 'moment';

const chance = new Chance();
faker.locale = 'en_GB';

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

export type SuppInfo = {
  SuppId: string;
  [key: string]: any;
};

const createSuppInfo = (): SuppInfo => ({
  SuppId: faker.datatype.uuid(),
  [faker.animal.type()]: JSON.parse(faker.datatype.json()),
  ...JSON.parse(faker.datatype.json()),
});

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
  SuppInfo?: SuppInfo;
};

const generateAddress = (): Address => {
  // BS7666Address or the standard AddressLines
  const addressType = Math.random() > 0.5;
  let address: Address = {};
  if (addressType) {
    address.BS7666Address = {
      SAON: optionalRand(`floor ${Math.floor(Math.random() * 100)}`),
      PAON: faker.address.buildingNumber(),
      Street: faker.address.street(),
      PostTown: faker.address.city(),
      UniquePropertyReferenceNumber: optionalRand(Math.floor(Math.random() * 999999999998) + 1),
      Locality: faker.address.city(),
      Town: optionalRand(faker.address.cityName()),
      AdministrativeArea: optionalRand(faker.address.county()),
    };
  } else {
    const lines = Math.floor(Math.random() * 4) + 1;
    const AddressLines: any = {};

    AddressLines.AddressLine1 = faker.address.streetAddress();

    if (lines > 1) {
      AddressLines.AddressLine2 = faker.address.secondaryAddress();
    }
    if (lines > 2) {
      AddressLines.AddressLine3 = faker.address.county();
    }
    if (lines > 3) {
      AddressLines.AddressLine4 = faker.address.cardinalDirection();
    }
    if (lines > 4) {
      AddressLines.AddressLine5 = faker.address.zipCode();
    }

    const coords = optionalRand(faker.address.nearbyGPSCoordinate([52.3555, 1.1743], 300));

    address = {
      AddressLines: optionalRand(AddressLines),
      County: optionalRand(faker.address.county()),
      PostCode: optionalRand(chance.postcode()),
      Zip: optionalRand(faker.address.zipCode()),
      Country: optionalRand(Math.random() > 0.5 ? faker.address.countryCode() : faker.address.country()),
      Easting: coords && coords[0],
      Northing: coords && coords[1],
    };
  }
  address.SuppInfo = createSuppInfo();
  return address;
};

const getDateFromString = (DOB: string) => moment(DOB, 'DD/MM/YYYY').toDate();

/**
 * Create the NC year (the year of the student) based on the DOB
 * E1: Early first year
 * E2: Early second year
 * R: Reception
 * 1 - 14: years 1 to 14
 * M: Mixed
 * X: Unknown
 */
const createNCyearActual = (DOB: string): string | number => {
  if (Math.random() > 0.05) return 'M';
  const dob = getDateFromString(DOB);
  const year = moment(dob).year();
  const currYear = moment().year();
  const age = currYear - year;
  if (age <= 1) {
    return 'E1';
  }
  if (age <= 2) {
    return 'E2';
  }
  if (age <= 4) {
    return 'R';
  }
  if (age <= 18) {
    return age - 5;
  }
  return 'x';
};

const Ethnicities = ['WBRI', 'WCOR', 'WENG', 'WNIR', 'WSCO', 'WWEL', 'WOWB', 'WIRI', 'WIRT', 'WOTH', 'WALB', 'WBOS', 'WCRO', 'WGRE', 'WGRK', 'WGRC', 'WITA', 'WKOS', 'WPOR', 'WSER', 'WTUR', 'WTUK', 'WTUC', 'WEUR', 'WEEU', 'WWEU', 'WOTW', 'WROM', 'WROG', 'WROR', 'WROO', 'MWBC', 'MWBA', 'MWAS', 'MWAP', 'MWAI', 'MWAO', 'MOTH', 'MAOE', 'MABL', 'MACH', 'MBOE', 'MBCH', 'MCOE', 'MWOE', 'MWCH', 'MOTM', 'AIND', 'APKN', 'AMPK', 'AKPA', 'AOPK', 'ABAN', 'AOTH', 'AAFR', 'AKAO', 'ANEP', 'ASNL', 'ASLT', 'ASRO', 'AOTA', 'BCRB', 'BAFR', 'BANN', 'BCON', 'BGHA', 'BNGN', 'BSLN', 'BSOM', 'BSUD', 'BAOF', 'BOTH', 'BEUR', 'BNAM', 'BOTB', 'CHNE', 'CHKC', 'CMAL', 'CSNG', 'CTWN', 'COCH', 'OOTH', 'OAFG', 'OARA', 'OEGY', 'OFIL', 'OIRN', 'OIRQ', 'OJPN', 'OKOR', 'OKRD', 'OLAM', 'OLEB', 'OLIB', 'OMAL', 'OMRC', 'OPOL', 'OTHA', 'OVIE', 'OYEM', 'OOEG'];

/**
 * Gets a random ethnicity code, creates a very diverse school
 */
const getEthnicity = (): string => {
  if (Math.random() > 0.05) {
    return 'NOBT';
  }
  return Ethnicities[Math.floor(Math.random() * Ethnicities.length)];
};

const LanguageTypes = ['F', 'M', 'H', 'T', 'S', 'C', 'U', 'V', 'W'];

const getLanguageType = (): string => LanguageTypes[Math.floor(Math.random() * LanguageTypes.length)];

const Languages = ['ACL', 'ADA', 'AFA', 'AFK', 'AKA', 'AKA', 'AKA', 'ALB', 'ALU', 'AMR', 'ARA', 'ARA', 'ARA', 'ARA', 'ARA', 'ARA', 'ARA', 'ARM', 'ASM', 'ASR', 'AYB', 'AYM', 'AZE', 'BAI', 'BAL', 'BEJ', 'BEL', 'BEM', 'BHO', 'BIK', 'BLT', 'BMA', 'BNG', 'BNG', 'BNG', 'BNG', 'BSL', 'BSQ', 'BUL', 'CAM', 'CAT', 'CCE', 'CCF', 'CGA', 'CGR', 'CHE', 'CHI', 'CHI', 'CHI', 'CHI', 'CHI', 'CHI', 'CKW', 'CRN', 'CTR', 'CWA', 'CYM', 'CZE', 'DAN', 'DGA', 'DGB', 'DIN', 'DUT', 'DZO', 'EBI', 'EDO', 'EFI', 'ENB', 'ENG', 'ESA', 'EST', 'EWE', 'EWO', 'FAN', 'FIJ', 'FIN', 'FON', 'FRN', 'FUL', 'GAA', 'GAE', 'GAL', 'GEO', 'GER', 'GGO', 'GKY', 'GLG', 'GRE', 'GRE', 'GRE', 'GRN', 'GUJ', 'GUN', 'GUR', 'HAU', 'HDK', 'HEB', 'HER', 'HGR', 'HIN', 'IBA', 'IDM', 'IGA', 'IGB', 'IJO', 'ILO', 'ISK', 'ISL', 'ITA', 'JAV', 'JIN', 'JPN', 'KAM', 'KAN', 'KAR', 'KAS', 'KAU', 'KAZ', 'KCH', 'KGZ', 'KHA', 'KHY', 'KIN', 'KIR', 'KIS', 'KLN', 'KMB', 'KME', 'KNK', 'KNY', 'KON', 'KOR', 'KPE', 'KRI', 'KRU', 'KSI', 'KSU', 'KUR', 'KUR', 'KUR', 'KUR', 'LAO', 'LBA', 'LBA', 'LBA', 'LGA', 'LGB', 'LGS', 'LIN', 'LIT', 'LNG', 'LOZ', 'LSO', 'LTV', 'LTZ', 'LUE', 'LUN', 'LUO', 'LUY', 'MAG', 'MAI', 'MAK', 'MAN', 'MAN', 'MAN', 'MAN', 'MAO', 'MAR', 'MAS', 'MDV', 'MEN', 'MKD', 'MLG', 'MLM', 'MLT', 'MLY', 'MLY', 'MLY', 'MNA', 'MNG', 'MNX', 'MOR', 'MSC', 'MUN', 'MYA', 'NAH', 'NAM', 'NBN', 'NDB', 'NDB', 'NDB', 'NEP', 'NOR', 'NOT', 'NUE', 'NUP', 'NWA', 'NZM', 'OAM', 'OAM', 'OAM', 'OGN', 'ORI', 'ORM', 'OTB', 'OTH', 'OTL', 'PAG', 'PAM', 'PAT', 'PHA', 'PHR', 'PNJ', 'PNJ', 'PNJ', 'PNJ', 'PNJ', 'POL', 'POR', 'POR', 'POR', 'PRS', 'PRS', 'PRS', 'PRS', 'QUE', 'RAJ', 'REF', 'RME', 'RMI', 'RMN', 'RMN', 'RMN', 'RMS', 'RNY', 'RNY', 'RNY', 'RUS', 'SAM', 'SCB', 'SCB', 'SCB', 'SCB', 'SCO', 'SHL', 'SHO', 'SID', 'SIO', 'SLO', 'SLV', 'SND', 'SNG', 'SNH', 'SOM', 'SPA', 'SRD', 'SRK', 'SSO', 'SSO', 'SSO', 'SSW', 'STS', 'SUN', 'SWA', 'SWA', 'SWA', 'SWA', 'SWA', 'SWA', 'SWE', 'TAM', 'TEL', 'TEM', 'TES', 'TGE', 'TGL', 'TGL', 'TGL', 'TGR', 'THA', 'TIB', 'TIV', 'TMZ', 'TMZ', 'TMZ', 'TMZ', 'TNG', 'TON', 'TPI', 'TRI', 'TSO', 'TUK', 'TUL', 'TUM', 'TUR', 'UKR', 'UMB', 'URD', 'URH', 'UYG', 'UZB', 'VEN', 'VIE', 'VSY', 'VSY', 'VSY', 'VSY', 'VSY', 'WAP', 'WCP', 'WOL', 'WPE', 'XHO', 'YAO', 'YDI', 'YOR', 'ZND', 'ZUL', 'ZZZ'];

const getLanguage = (): string => Languages[Math.floor(Math.random() * Languages.length)];

export {
  CreateSchoolJSON,
  optionalRand,
  getRandomTitle,
  getRelationship,
  createSuppInfo,
  generateAddress,
  getDateFromString,
  createNCyearActual,
  getEthnicity,
  getLanguageType,
  getLanguage,
};
