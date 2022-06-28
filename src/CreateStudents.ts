import { ATfile, create } from 'ATfile';
import { create as cHeader } from 'ATfile/Header';
import * as xmlToJSON from 'xml-js';
import fs from 'fs';
// inporting for efficiency
import 'data/edubasealldata.json';

const generateFileName = (atFile: ATfile, num: number): string => {
  // From a school to another school, LLLsss1_CTF_LLLsss2_num.xml
  const start = `${atFile.header.SourceSchool.LEA}${atFile.header.SourceSchool.Estab}`;

  const end = `${atFile.header.DestSchool.LEA}${atFile.header.DestSchool.Estab}`;

  // if num is over 999, it'll roll over. It's also padded with zeros.
  const outNum = String(num % 999).padStart(3, '0');

  return `${start}_${end}_${outNum}.xml`;
};

/**
 * This is the main method to generate pupils.
 * It creates 1 or more XML files, all from the same school, to the same school.
 *
 * @param pupils number of pupils to generate
 * @param num number of XML file to generate
 */
const generateFiles = async (pupils: number, num: number) => {
  console.log(`Generating ${pupils} Pupil${pupils > 1 ? 's' : ''}!`);
  const start = Date.now();
  const header = cHeader();
  for (let i = 0; i < num; i++) {
    const jsObj = create(pupils, header);
    // converting to JSON before XML as the jsonify removes 'undefined' objects!
    const xml = xmlToJSON.json2xml(JSON.stringify(jsObj), { compact: true, ignoreComment: true, spaces: 4 });
    const fileName = generateFileName(jsObj, i);

    fs.writeFile(
      `output/${fileName}`,
      xml,
      () => {
        console.log(`out path: output/${fileName}\nFinished in ${Date.now() - start}ms`);
      },
    );
  }
};

const init = async () => {
  const args: any[] = process.argv.slice(2);

  const PUPILS_TO_GENERATE_PER_FILE = args[0] ? parseInt(args[0], 10) : 1;
  const FILES_TO_GENERATE = args[1] ? parseInt(args[1], 10) : 1;

  await generateFiles(PUPILS_TO_GENERATE_PER_FILE, FILES_TO_GENERATE);
};

init();
