import {
  BaseEntity,
  BaseEntityProps,
} from '@/modules/shared/domain/entities/base.entity';
import { capitalizeName } from '@/modules/shared/utils/capitalize-name.util';
import { removeNonDigits } from '@/modules/shared/utils/remove-non-digits.util';

type CompanyEntityProps = BaseEntityProps & {
  corporateName: string;
  tradingName: string;
  federalDocument: string | null;
};

export class CompanyEntity extends BaseEntity implements CompanyEntityProps {
  public corporateName: string;
  public tradingName: string;
  public federalDocument: string | null;

  constructor(props: CompanyEntityProps) {
    super(props);
    this.corporateName = capitalizeName(props.corporateName.trim());
    this.tradingName = capitalizeName(props.tradingName.trim());
    this.federalDocument = props.federalDocument
      ? removeNonDigits(props.federalDocument.trim())
      : null;
  }
}
