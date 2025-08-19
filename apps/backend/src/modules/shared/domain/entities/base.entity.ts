export interface BaseEntityProps {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export abstract class BaseEntity implements BaseEntityProps {
  public id: string;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date | null;

  constructor(props: BaseEntityProps) {
    this.id = props.id ?? crypto.randomUUID();
    const now = new Date();
    this.createdAt = props.createdAt ?? now;
    this.updatedAt = props.updatedAt ?? now;
    this.deletedAt = props.deletedAt ?? null;
  }
}
