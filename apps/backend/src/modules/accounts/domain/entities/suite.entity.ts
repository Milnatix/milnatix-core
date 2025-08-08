import {
  BaseEntity,
  BaseEntityProps,
} from '@/modules/shared/domain/entities/base.entity';

export type SuiteEntityProps = BaseEntityProps & {
  name: string;
};

export enum SuiteId {
  ADMIN = 'admin',
  CHEF_PARTNER = 'chef-partner',
}

export class SuiteEntity extends BaseEntity implements SuiteEntityProps {
  public name: string;

  constructor(props: SuiteEntityProps) {
    super(props);
    this.name = props.name;
  }
}
