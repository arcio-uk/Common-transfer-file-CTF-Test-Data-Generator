import { create } from 'ATfile';
import * as xmlToJSON from 'xml-js';
import fs from 'fs';
// inporting for efficiency
import 'data/edubasealldata.json';

const init = async () => {
  console.log('Generating!');
  const start = Date.now();
  const jsObj = create();

  // converting to JSON before XML as the jsonify removes 'undefined' objects!
  // TODO: replace this soon
  const xml = xmlToJSON.json2xml(JSON.stringify(jsObj), { compact: true, ignoreComment: true, spaces: 4 });

  fs.writeFile(
    'src/output.xml',
    xml,
    () => {
      console.log(xml);
      console.log(`Finished in ${Date.now() - start}ms`);
    },
  );
};

init();
