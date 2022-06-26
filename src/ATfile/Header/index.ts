import { GenerateRandomDate } from 'misc';
import { optionalRand, SuppInfo, createSuppInfo } from 'misc/misc';
import { DestSchool, create as cDestSchool } from './DestSchool';
import { SourceSchool, create as cSourceSchool } from './SourceSchool';

export type Header = {
  DocumentName: string;
  ATFversion: string;
  DateTime: Date;
  DocumentQualifier: string;
  SupplierID: string;
  SourceSchool: SourceSchool;
  DestSchool: DestSchool;
  SuppInfo?: SuppInfo
};

const create = () => ({
  DocumentName: 'Admissions Data Transfer File',
  ATFversion: '19.0',
  DateTime: GenerateRandomDate(new Date(2000, 1, 1), new Date(), true),
  DocumentQualifier: 'full',
  SupplierID: 'ArcioLLC',
  SourceSchool: cSourceSchool(),
  DestSchool: cDestSchool(),
  SuppInfo: optionalRand(createSuppInfo()),
});

export { create };
