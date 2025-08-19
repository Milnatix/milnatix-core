import {
  BaseEntity,
  BaseEntityProps,
} from '@/modules/shared/domain/entities/base.entity';
import { capitalizeName } from '@/modules/shared/utils/capitalize-name.util';

export interface ProductEntityProps extends BaseEntityProps {
  companyId: string;
  name: string;
  description: string | null;
  salePrice: number;
  costPrice: number | null;
  isAvailable: boolean;
}

export class ProductEntity extends BaseEntity implements ProductEntityProps {
  public name: string;
  public description: string | null;
  public salePrice: number;
  public costPrice: number | null;
  public isAvailable: boolean;
  public companyId: string;

  constructor(props: ProductEntityProps) {
    super(props);
    this.name = capitalizeName(props.name.trim());
    this.description = props.description?.trim() || null;
    this.salePrice = props.salePrice;
    this.costPrice = props.costPrice;
    this.isAvailable = props.isAvailable;
    this.companyId = props.companyId;
  }
}
