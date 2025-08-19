import { PartialType } from '@nestjs/mapped-types';
import { FormProductRequestDTO } from './form.request.dto';

export class UpdateProductRequestDTO extends PartialType(FormProductRequestDTO) {}
