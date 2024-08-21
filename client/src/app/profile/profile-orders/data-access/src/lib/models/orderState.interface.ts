import { IOrderItem } from './orderItem.interface';

export interface IOrderState {
  orderItems: IOrderItem[] | undefined;
  error: string | null;
  loading: boolean;
  orderDetailed: IOrderItem | undefined
}
