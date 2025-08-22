export type IdContext<T = undefined> = {
  id: string;
} & (T extends undefined ? unknown : { payload: T });
