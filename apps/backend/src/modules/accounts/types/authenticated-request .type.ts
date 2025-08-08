import { Request } from 'express';
import { TokenPayloadOutput } from './token-payload-output.type';

export interface AuthenticatedRequest extends Request {
  user?: TokenPayloadOutput;
  companyId?: string;
}
