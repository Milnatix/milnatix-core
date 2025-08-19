import {
  BaseEntity,
  BaseEntityProps,
} from '@/modules/shared/domain/entities/base.entity';
import { capitalizeName } from '@/modules/shared/utils/capitalize-name.util';
import { removeNonDigits } from '@/modules/shared/utils/remove-non-digits.util';

export interface CustomerAddressEntityProps extends BaseEntityProps {
  customerId: string;
  street: string;
  number: string | null;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string | null;
}

export class CustomerAddressEntity
  extends BaseEntity
  implements CustomerAddressEntityProps
{
  public customerId: string;
  public street: string;
  public number: string;
  public complement: string | null;
  public neighborhood: string;
  public city: string;
  public state: string;
  public zipCode: string | null;

  constructor(props: CustomerAddressEntityProps) {
    super(props);
    this.customerId = props.customerId;
    this.street = capitalizeName(props.street);
    this.number = props.number || 'S/N';
    this.complement = props.complement
      ? capitalizeName(props.complement)
      : null;
    this.neighborhood = props.neighborhood
      ? capitalizeName(props.neighborhood)
      : '';
    this.city = props.city ? capitalizeName(props.city) : '';
    this.state = props.state ? capitalizeName(props.state) : '';
    this.zipCode = props.zipCode ? removeNonDigits(props.zipCode) : null;
  }
}
