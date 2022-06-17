import { GenerateRandomDate } from 'misc';
import { DestSchool } from './DestSchool';
import { SourceSchool, create as cSourceSchool } from './SourceSchool';
import { SuppInfo } from './SuppInfo';

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
});

export { create };
