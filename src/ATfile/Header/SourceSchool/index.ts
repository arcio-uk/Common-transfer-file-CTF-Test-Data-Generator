import { faker } from '@faker-js/faker';
import GetRandomSchool from 'misc/GetRandomSchool';
import { optionalRand } from 'misc/misc';

export type SourceSchool = {
  LEA: string; // local establishment authority
  Estab: String; // EstablishmentNumber
  URN?: number;
  SchoolName: string;
  AcademicYear: number;
};

export const create = (): SourceSchool => {
  const school = GetRandomSchool();
  return {
    LEA: school['LA (code)'],
    Estab: school.EstablishmentNumber,
    URN: optionalRand(school.URN),
    SchoolName: school.EstablishmentName,
    AcademicYear: faker.date.birthdate({ min: 2, max: 19, mode: 'age' }).getFullYear(),
  };
};
