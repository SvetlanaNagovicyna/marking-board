import { Times } from './times.interface';

export interface TimesData {
  idDb: string;
  times: { [key: string]: Times };
}
