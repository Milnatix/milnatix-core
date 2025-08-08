import {
  BaseEntity,
  BaseEntityProps,
} from '@/modules/shared/domain/entities/base.entity';

export type UserCompanySuiteEntityProps = BaseEntityProps & {
  userId: string;
  companyId: string | null;
  suiteId: string;
};

export class UserCompanySuiteEntity
  extends BaseEntity
  implements UserCompanySuiteEntityProps
{
  public userId: string;
  public companyId: string | null;
  public suiteId: string;

  constructor(props: UserCompanySuiteEntityProps) {
    super(props);
    this.userId = props.userId;
    this.companyId = props.companyId;
    this.suiteId = props.suiteId;
  }
}
