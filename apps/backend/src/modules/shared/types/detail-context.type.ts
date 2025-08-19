export type DetailContext<T = undefined> = {
  id: string;
  companyId: string;
} & (T extends undefined ? unknown : { payload: T });
