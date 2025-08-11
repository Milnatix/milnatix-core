type OperatorValue<T> = {
  in?: Exclude<T, null | undefined>[];
};

export type Where<Entity> = Partial<{
  [K in keyof Entity]: Entity[K] | OperatorValue<Entity[K]>;
}>;
