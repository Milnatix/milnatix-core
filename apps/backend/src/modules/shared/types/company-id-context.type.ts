export type CompanyIdContext<T = undefined> = {
  companyId: string;
} & (T extends undefined ? unknown : { payload: T });
