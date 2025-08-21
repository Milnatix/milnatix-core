type OperatorValue<T> = {
  in?: Exclude<T, null | undefined>[];
  not?: T;
};

type Reserved = '$or' | '$and' | '$not';

type FieldWhere<Entity> = Partial<{
  [K in Exclude<keyof Entity, Reserved>]: Entity[K] | OperatorValue<Entity[K]>;
}>;

export type Where<Entity> = FieldWhere<Entity> & {
  $or?: Where<Entity>[];
  $and?: Where<Entity>[];
};
