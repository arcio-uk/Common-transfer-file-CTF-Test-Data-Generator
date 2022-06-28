import { create } from 'ATfile';
import * as xmlToJSON from 'xml-js';
import fs from 'fs';
// inporting for efficiency
import 'data/edubasealldata.json';

const init = async () => {
  const args: any[] = process.argv.slice(2);

  const PUPILS_TO_GENERATE = args[0] ? parseInt(args[0], 10) : 1;
  console.log(JSON.stringify(args, null, 2));

  console.log(`Generating ${PUPILS_TO_GENERATE} Pupil${PUPILS_TO_GENERATE > 1 ? 's' : ''}!`);
  const start = Date.now();
  const jsObj = create(PUPILS_TO_GENERATE);

  // converting to JSON before XML as the jsonify removes 'undefined' objects!
  // TODO: replace this soon
  const xml = xmlToJSON.json2xml(JSON.stringify(jsObj), { compact: true, ignoreComment: true, spaces: 4 });

  fs.writeFile(
    'output/output.xml',
    xml,
    () => {
      // console.log(xml);
      console.log(`Finished in ${Date.now() - start}ms`);
    },
  );
};

init();
