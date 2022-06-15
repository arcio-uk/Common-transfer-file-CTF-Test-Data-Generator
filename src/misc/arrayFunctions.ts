/* eslint-disable no-param-reassign */
import schoolFormat from './formattedSchool.json';

/**
 * Converts the csv line with quotes into a string
 *
 * taken from https://stackoverflow.com/a/8497474/5758415
 *
 * @param text The csv line
 * @returns
 */
export const CSVtoArray = (text: string): string[] => {
  const re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
  const re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
  // Return NULL if input string is not well formed CSV string.
  if (!re_valid.test(text)) return [''];
  const a = []; // Initialize array to receive values.
  text.replace(
    re_value, // "Walk" the string using replace with callback.
    (m0, m1, m2, m3) => {
      // Remove backslash from \' in single quoted values.
      if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
      // Remove backslash from \" in double quoted values.
      else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
      else if (m3 !== undefined) a.push(m3);
      return ''; // Return empty string.
    },
  );
  // Handle special case of empty last value.
  if (/,\s*$/.test(text)) a.push('');
  return a;
};

/**
 * Gets an object's key for a given value
 *
 * @param object
 * @param value
 * @returns
 */
const getKeyByValue = (object: { [x: string]: any; }, value: any) => Object.keys(object).find((key) => object[key] === value);

/**
 * TODO: this needs to get finished, might not be worth doing
 * This function is to normalise the flatfile object input.
 *
 * @param fm The 'schoolFormat'
 * @param school The flat file JSON
 * @returns Normalised Json
 */
const replaceEntry = (fm: any, school: any) => {
  const reoccour = (format: any) => {
    for (const property in format) {
      // if there's Object.regex, we should create an array containing positive regex matches
      // eslint-disable-next-line no-continue
      if (format[property] === undefined) continue;
      if (format[property].regex) {
        format[property] = Object.keys(school)
          .filter((key) => new RegExp(format[property].regex, 'g').test(key))
          .map((key) => ({ [key]: school[key] }));
      } else if (typeof format[property] === 'object') {
        // if there's a nested object, recursively replace it's children.
        console.log(`format[${property}] === object, ${format[property]}`);
        format[property] = reoccour(format[property]);
      } else if (format[property] !== undefined) {
        // replace the contents of the child with the data
        const key = getKeyByValue(format, property);
        if (!key) {
          // delete format[property];
        } else {
          console.log(`Just set format[${key}] to ${school[property]}`);
          format[key] = school[property];
        }
      } else {
        console.log(`Would be deleting: ${format[property]}: ${school[format[property]]}`);
        //
      }
    }
    return format;
  };
  const modifiedFormat = reoccour(fm);
  return modifiedFormat;
};

/**
 * Used to create the object of the school
 *
 * @param line the csv line
 * @param format the csv header in array format
 * @returns
 */
export const createEntry = (line:string, format: string[]): any => {
  const unNormalisedObj = CSVtoArray(line)
    .reduce((prev: any, entry: string | number, i) => {
      if (typeof entry === 'string') entry = entry.indexOf('"') === 0 ? entry.slice(1, entry.length - 1) : entry;
      if (entry !== '' && entry !== 'Not applicable' && entry !== '0' && entry !== '00') {
        if (+entry) entry = +entry;
        prev[format[i]] = entry;
      }
      return prev;
    }, {});
  return unNormalisedObj;
  // return replaceEntry(schoolFormat, unNormalisedObj);
};
