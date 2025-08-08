import { SuiteId } from '../domain/entities/suite.entity';

export interface TokenPayloadInput {
  sub: string;
  email?: string;
  suiteId: SuiteId;
}
