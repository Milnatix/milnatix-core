import {
  BaseEntity,
  BaseEntityProps,
} from '@/modules/shared/domain/entities/base.entity';
import { capitalizeName } from '@/modules/shared/utils/capitalize-name.util';
import { removeNonDigits } from '@/modules/shared/utils/remove-non-digits.util';

export interface VendorEntityProps extends BaseEntityProps {
  corporateName?: string | null;
  tradingName: string;
  federalDocument?: string | null;
  email?: string | null;
  phone?: string | null;
  note?: string | null;
}

export class VendorEntity extends BaseEntity implements VendorEntityProps {
  public corporateName?: string | null;
  public tradingName: string;
  public federalDocument?: string | null;
  public email?: string | null;
  public phone?: string | null;
  public note?: string | null;

  constructor(props: VendorEntityProps) {
    super(props);
    this.corporateName = props.corporateName ? capitalizeName(props.corporateName) : null;
    this.tradingName = capitalizeName(props.tradingName.trim());
    this.federalDocument = props.federalDocument ? removeNonDigits(props.federalDocument) : null;
    this.email = props.email?.trim().toLowerCase() ?? null;
    this.phone = props.phone ? removeNonDigits(props.federalDocument) : null;
    this.note = props.note?.trim() ?? null;
  }
}