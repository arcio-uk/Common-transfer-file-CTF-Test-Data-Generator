# Common-transfer-file-CTF-Test-Data-Generator
Do you need to test out your MIS without exposing sensitive student data?
It's not worth taking the risk of uploading school's data to an untrusted company on cloud servers which could be anywhere.

This project is to allow generation of test data for the Common transfer file (CTF) XML Standard, to allow you to test out software safely.

# Need Custom Data?

Email us at [queries@arcio.uk](mailto:queries@arcio.uk) for custom test data generation services to meet your requirements!

# How to use it

1. Install Node.js and NPM
2. run `npm install`
3. run `npm run csv-to-json`
4. run `npm run create-students -- {the amount of students you want to generate} {the amount of files you want to generate}`
5. go to /output/ and look at your newly generated XML files!


# Config

Take a look at /src/config.ts for config variables.

	CHANCE_OF_OPTIONAL_VARS is how frequently the generator will generate optional variables.

	CHANCE_OF_SUPP_INFO is how frequently the generator will generate supplemental information (SuppInfo).



# Resources

[CTF Specification Page](https://www.gov.uk/government/collections/common-transfer-file)

[CBDS download page](https://www.gov.uk/government/publications/common-basic-data-set-cbds-database)