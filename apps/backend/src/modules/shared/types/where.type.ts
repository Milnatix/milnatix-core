export type Where<Entity> = Partial<{
  [K in keyof Entity]: Entity[K];
}>;
