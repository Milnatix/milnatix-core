import { UserEntity } from '@/modules/accounts/domain/entities/user.entity';
import { UserRepositoryPortOut } from '@/modules/accounts/ports/out/user-repository.port';
import { PrismaService } from '@/modules/shared/infra/prisma/prisma.service';
import { Where } from '@/modules/shared/types/where.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepositoryAdapter implements UserRepositoryPortOut {
  constructor(private readonly prisma: PrismaService) {}

  public async create(user: UserEntity): Promise<void> {
    await this.prisma.user.create({
      data: user,
    });
  }

  public async logicalDelete(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  public async list(where?: Where<UserEntity>): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      where: { ...where, deletedAt: null },
    });

    return users.map(
      (user) =>
        new UserEntity({
          id: user.id,
          email: user.email,
          password: user.password,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          deletedAt: user.deletedAt ?? null,
        }),
    );
  }

  public async update(id: string, user: UserEntity): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        email: user.email,
        password: user.password,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
      },
    });
  }

  public async trueDelete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  public async findOne(where: Partial<UserEntity>): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: { ...where, deletedAt: null },
    });
    if (!user) {
      return null;
    }
    return new UserEntity(user);
  }
}
