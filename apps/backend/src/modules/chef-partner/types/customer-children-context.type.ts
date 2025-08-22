import { IdContext } from '@/modules/shared/types/id-context.type';
import { CustomerIdContext } from './customer-id-context.type';

export type CustomerChildrenContext<T = unknown> = IdContext<T> &
  CustomerIdContext<T>;
