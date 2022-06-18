import GetRandomSchool from 'misc/GetRandomSchool';

export type DestSchool = {
  LEA: string;
  Estab: string;
  URN?: number | string;
};

const create = (): DestSchool => {
  const school = GetRandomSchool();
  return {
    LEA: school['LA (code)'],
    Estab: school.EstablishmentNumber,
    URN: school.URN,
  };
};

export { create };
