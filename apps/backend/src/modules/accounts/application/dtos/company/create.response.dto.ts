import { CompanyEntity } from '@/modules/accounts/domain/entities/company.entity';

type CreateCompanyResponseDTOProps = Pick<
  CompanyEntity,
  'id' | 'corporateName' | 'tradingName'
>;

export class CreateCompanyResponseDTO implements CreateCompanyResponseDTOProps {
  public id: string;
  public corporateName: string;
  public tradingName: string;

  constructor(props: CreateCompanyResponseDTOProps) {
    this.id = props.id;
    this.corporateName = props.corporateName;
    this.tradingName = props.tradingName;
  }
}
