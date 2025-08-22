import {
  BaseEntity,
  BaseEntityProps,
} from '@/modules/shared/domain/entities/base.entity';
import { capitalizeName } from '@/modules/shared/utils/capitalize-name.util';

export enum PaymentType {
  DIGITAL = 'DIGITAL',
  CARD = 'CARD',
  CASH = 'CASH',
  VOUCHER = 'VOUCHER',
  OTHER = 'OTHER',
}

export interface PaymentMethodEntityProps extends BaseEntityProps {
  name: string;
  isActive: boolean;
  type: PaymentType;
}

export class PaymentMethodEntity
  extends BaseEntity
  implements PaymentMethodEntityProps
{
  public name: string;
  public isActive: boolean;
  public type: PaymentType;

  constructor(props: PaymentMethodEntityProps) {
    super(props);
    this.name = capitalizeName(props.name.trim());
    this.isActive = props.isActive;
    this.type = props.type;
  }
}
