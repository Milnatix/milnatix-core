import {
  CustomerEntity,
  CustomerEntityProps,
} from '@/modules/chef-partner/domain/entities/customer.entity';
import {
  CUSTOMER_REPOSITORY_PORT_TOKEN,
  CustomerRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/customer-repository.port';
import { Where } from '@/modules/shared/types/where.type';
import { ConflictException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CustomerUniqueValidator {
  constructor(
    @Inject(CUSTOMER_REPOSITORY_PORT_TOKEN)
    private readonly customerRepository: CustomerRepositoryPortOut,
  ) {}

  private buildCondition<T>(
    field: keyof T,
    value?: string | null,
  ): Where<T> | null {
    return value ? ({ [field]: value } as Where<T>) : null;
  }

  private buildUniqueConditions(
    entity: CustomerEntity,
  ): Where<CustomerEntity>[] {
    const conditions: Where<CustomerEntity>[] = [];

    const emailCondition = this.buildCondition<CustomerEntity>(
      'email',
      entity.email,
    );
    console.log('emailCondition', emailCondition);
    if (emailCondition) conditions.push(emailCondition);

    const phoneCondition = this.buildCondition<CustomerEntity>(
      'phone',
      entity.phone,
    );
    if (phoneCondition) conditions.push(phoneCondition);

    const documentCondition = this.buildCondition<CustomerEntity>(
      'federalDocument',
      entity.federalDocument,
    );
    if (documentCondition) conditions.push(documentCondition);

    if (entity.fullName && entity.fullName.trim() !== '') {
      conditions.push({ fullName: entity.fullName });
    }

    return conditions;
  }

  private handleConflictException(
    existing: CustomerEntity,
    entity: CustomerEntity,
  ): never {
    const fieldMappings: Partial<Record<keyof CustomerEntityProps, string>> = {
      email: 'email',
      phone: 'telefone',
      federalDocument: 'documento',
      fullName: 'nome completo',
    };

    const duplicatedFields = (
      Object.keys(fieldMappings) as (keyof CustomerEntity)[]
    )
      .filter((key) => entity[key] && existing[key] === entity[key])
      .map((key) => fieldMappings[key]);

    const fieldsMessage =
      duplicatedFields.length > 0 ? ` (${duplicatedFields.join(', ')})` : '';

    throw new ConflictException(`Dados já existentes no banco${fieldsMessage}`);
  }

  public async ensureUnique(
    customerToValidate: CustomerEntity,
    companyId: string,
    excludeId?: string,
  ): Promise<void> {
    const orConditions = this.buildUniqueConditions(customerToValidate);
    if (!orConditions.length) return;

    const where: Where<CustomerEntity> = {
      $and: [
        orConditions.length > 1 ? { $or: orConditions } : orConditions[0],
        { companyId },
        ...(excludeId ? [{ id: { not: excludeId } }] : []),
      ],
    };

    const existing = await this.customerRepository.findOne(where);

    if (existing) this.handleConflictException(existing, customerToValidate);
  }
}
