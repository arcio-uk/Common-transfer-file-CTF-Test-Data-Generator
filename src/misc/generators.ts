import { faker } from '@faker-js/faker';
import { Header } from 'ATfile/Header';

/**
 * This creates the application reference number
 *
 * ? no idea what mm is or is supposed to be :(
 * LEA-YYYY-MM-N-999999, LA is home LA (secondary applications)
 * or maintaining LA for primary applications,
 * YYYY is the academic year of entry, N is E(Online) K (Keyboard) B (Batch)
 * Last component six digits. For inyear applications MM will be incremented by
 * @param header
 */
const createApplicationReference = (header: Header): string => {
  // https://docs.google.com/spreadsheets/d/1dFoRhl0pWDWaDoLBpHwiDPD4JzBdqKnZmp9hUG0YZnk/edit#gid=1461571706&range=E132
  const { LEA } = header.SourceSchool;
  const year = header.SourceSchool.AcademicYear;
  const MM = String(faker.datatype.number({ max: 99 })).padStart(2, '0');
  const nPossibilities = ['E', 'K', 'B'];
  const N = nPossibilities[Math.floor(Math.random() * nPossibilities.length)];
  const num = String(faker.datatype.number({ max: 999999 })).padStart(6, '0');

  return `${LEA}-${year}-${MM}-${N}-${num}`;
};

// eslint-disable-next-line import/prefer-default-export
export { createApplicationReference };
