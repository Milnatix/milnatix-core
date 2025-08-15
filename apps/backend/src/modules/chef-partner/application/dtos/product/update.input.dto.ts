import {
  CreateProductInputDTO,
  CreateProductInputDTOProps,
} from './create.input.dto';

interface UpdateProductInputDTOProps extends CreateProductInputDTOProps {
  id: string;
}

export class UpdateProductInputDTO
  extends CreateProductInputDTO
  implements UpdateProductInputDTOProps
{
  public readonly id: string;

  constructor(props: UpdateProductInputDTOProps) {
    super(props);
    this.id = props.id;
  }
}
