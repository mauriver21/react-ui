export type CodeTab = {
  name: string;
  code?: string;
  codePath?: string;
  language?: string;
  mapReplace?: { [matchText: string]: string };
};
