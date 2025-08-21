import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { Where } from '../../types/where.type';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  public async executePrismaUpdate<T>(
    operation: () => Promise<T>,
  ): Promise<T | null> {
    try {
      return await operation();
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return null;
      }
      throw error;
    }
  }

  public toPrismaWhere<Entity>(
    where?: Where<Entity>,
  ): Record<string, any> | undefined {
    if (!where) return undefined;

    const prismaWhere: Record<string, any> = {};

    for (const key in where) {
      const value = where[key as keyof Where<Entity>];

      if (key === '$or' && Array.isArray(value)) {
        prismaWhere.OR = value.map((cond) =>
          this.toPrismaWhere(cond as Where<Entity>),
        );
      } else if (key === '$and' && Array.isArray(value)) {
        prismaWhere.AND = value.map((cond) =>
          this.toPrismaWhere(cond as Where<Entity>),
        );
      } else if (key === '$not' && value) {
        prismaWhere.NOT = this.toPrismaWhere(value as Where<Entity>);
      } else if (value && typeof value === 'object' && 'in' in value) {
        prismaWhere[key] = { in: (value as { in: unknown[] }).in };
      } else {
        prismaWhere[key] = value;
      }
    }

    return prismaWhere;
  }
}
