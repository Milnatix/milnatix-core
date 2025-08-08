import { Injectable } from '@nestjs/common';
import { UserCompanySuiteEntity } from '../../domain/entities/user-company-suite.entity';
import { UserCompanySuiteRepositoryPortOut } from '../../ports/out/user-company-suite-repository.port';
import { PrismaService } from '@/modules/shared/infra/prisma/prisma.service';
import { Where } from '@/modules/shared/types/where.type';

@Injectable()
export class PrismaUserCompanySuiteRepositoryAdapter
  implements UserCompanySuiteRepositoryPortOut
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(userCompanySuite: UserCompanySuiteEntity): Promise<void> {
    await this.prisma.userCompanySuite.create({
      data: userCompanySuite,
    });
  }

  public async list(
    where?: Where<UserCompanySuiteEntity>,
  ): Promise<UserCompanySuiteEntity[]> {
    const userCompanySuites = await this.prisma.userCompanySuite.findMany({
      where: { ...where, deletedAt: null },
    });
    return userCompanySuites.map(
      (userCompanySuite) =>
        new UserCompanySuiteEntity({
          userId: userCompanySuite.userId,
          companyId: userCompanySuite.companyId,
          suiteId: userCompanySuite.suiteId,
        }),
    );
  }

  public async logicalDelete(id: string): Promise<void> {
    await this.prisma.userCompanySuite.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  public async trueDelete(id: string): Promise<void> {
    await this.prisma.userCompanySuite.delete({ where: { id } });
  }

  public async update(
    id: string,
    userCompanySuite: UserCompanySuiteEntity,
  ): Promise<void> {
    await this.prisma.userCompanySuite.update({
      where: { id },
      data: userCompanySuite,
    });
  }

  public async findOne(
    where: Partial<UserCompanySuiteEntity>,
  ): Promise<UserCompanySuiteEntity | null> {
    const userCompanySuite = await this.prisma.userCompanySuite.findFirst({
      where: { ...where, deletedAt: null },
    });
    if (!userCompanySuite) {
      return null;
    }
    return new UserCompanySuiteEntity({
      id: userCompanySuite.id,
      userId: userCompanySuite.userId,
      companyId: userCompanySuite.companyId,
      suiteId: userCompanySuite.suiteId,
    });
  }
}
