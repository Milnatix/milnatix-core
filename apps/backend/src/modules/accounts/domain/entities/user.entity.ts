import {
  BaseEntity,
  BaseEntityProps,
} from '@/modules/shared/domain/entities/base.entity';

export type UserEntityProps = BaseEntityProps & {
  email: string;
  password: string;
};

export class UserEntity extends BaseEntity implements UserEntityProps {
  public email: string;
  public password: string;

  constructor(props: UserEntityProps) {
    super(props);
    this.email = props.email.toLowerCase().trim();
    this.password = props.password;
  }
}
