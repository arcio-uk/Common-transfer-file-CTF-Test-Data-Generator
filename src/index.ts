import { create as CreateHeader } from 'ATfile/Header';
import fs from 'fs';

const init = async () => {
  console.log('Generating!');
  /*fs.writeFile(
    'src/output.json',
    JSON.stringify(CreateHeader(), null, 2),
    () => console.log(CreateHeader()),
  );*/
  console.log(CreateHeader());
};

init();
