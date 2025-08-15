import { CodeStrategy } from '@interfaces/CodeStrategy';

export type CodeTab = {
  name: string;
  code?: string;
  language?: string;
  mapReplace?: { [matchText: string]: string };
} & CodeStrategy;
