export type CustomerIdContext<T = undefined> = {
  customerId: string;
} & (T extends undefined ? unknown : { payload: T });
