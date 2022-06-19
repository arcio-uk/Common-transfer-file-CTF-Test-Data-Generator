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

/**
 * This is used to calculate the check letter for the UPN,
 * ? This seems dumb, it only uses 23 letters of the alphabet?
 * ? Why is this not just a 2 digit number...
 *
 * @param num
 * @returns
 */
const calculateCheckLetter = (num: string) => {
  const checkLetterMap = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ];
  let total = 0;
  // eslint-disable-next-line guard-for-in
  Object.entries(num.split('')).forEach((digit) => {
    total += (parseInt(digit[0], 10) + 1) * parseInt(digit[1], 10);
  });
  return checkLetterMap[total % 23];
};

/**
 * A999999999999 or A99999999999A (for temporary UPN)
 * Any alphabetical character other than I, O, or S.
 * Characters 2-4 must be a valid post April 1998 LA code or
 * a recognised Welsh "pseudo LA" code  (see LA list codeset)
 * To calculate the check letter:
 * @param header
 */
const createUPN = (header: Header): string => {
  const { LEA } = header.SourceSchool;
  const number = String(faker.datatype.number({ max: 999999999999 })).padStart(12, '0');
  const checkLetter = calculateCheckLetter(number);
  const UPN = LEA + number;
  return Math.random() > 0.5 ? checkLetter + UPN + checkLetter : UPN + checkLetter;
};

export { createApplicationReference, createUPN };
