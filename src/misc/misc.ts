import * as fs from 'fs';
import { createEntry, CSVtoArray } from 'misc';
import * as readline from 'readline';

const CreateSchoolJSON = async () => {
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
  }
  fs.writeFile('src/data/edubasealldata.json', JSON.stringify(entries, null, 2), () => console.log('File written!'));
};

// eslint-disable-next-line import/prefer-default-export
export { CreateSchoolJSON };