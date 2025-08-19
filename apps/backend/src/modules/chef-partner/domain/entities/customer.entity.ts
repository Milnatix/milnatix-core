import {
  BaseEntity,
  BaseEntityProps,
} from '@/modules/shared/domain/entities/base.entity';
import { capitalizeFirst } from '@/modules/shared/utils/capitalize-first.util';
import { capitalizeName } from '@/modules/shared/utils/capitalize-name.util';
import { removeNonDigits } from '@/modules/shared/utils/remove-non-digits.util';

export interface CustomerEntityProps extends BaseEntityProps {
  fullName: string;
  email: string | null;
  phone: string | null;
  federalDocument: string | null;
  companyId: string;
  note: string | null;
}

export class CustomerEntity extends BaseEntity implements CustomerEntityProps {
  public fullName: string;
  public email: string | null;
  public phone: string | null;
  public federalDocument: string | null;
  public companyId: string;
  public note: string | null;

  constructor(props: CustomerEntityProps) {
    super(props);
    this.fullName = capitalizeName(props.fullName.trim());
    this.email = props.email?.toLowerCase().trim() || null;
    this.phone = props.phone ? removeNonDigits(props.phone.trim()) : null;
    this.federalDocument = props.federalDocument
      ? removeNonDigits(props.federalDocument.trim())
      : null;
    this.companyId = props.companyId;
    this.note = props.note ? capitalizeFirst(props.note.trim()) : null;
  }
}
