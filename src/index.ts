import fs from 'fs';
import { CreateSchoolJSON } from 'misc/misc';
import {create as cAtFile} from 'ATfile';

// inporting for efficiency
import 'data/edubasealldata.json';

const init = async () => {
  // await CreateSchoolJSON(500);
  console.log('Generating!');
  /*fs.writeFile(
    'src/output.json',
    JSON.stringify(CreateHeader(), null, 2),
    () => console.log(CreateHeader()),
  );*/
  console.log(JSON.stringify(cAtFile(), null, 2));
};

init();
