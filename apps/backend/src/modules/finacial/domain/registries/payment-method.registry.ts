import {
  PaymentMethodEntityProps,
  PaymentType,
} from '../entities/payment-method.entity';

export const PAYMENT_METHOD_REGISTRY: ReadonlyArray<PaymentMethodEntityProps> =
  [
    {
      id: 'cash',
      name: 'Dinheiro',
      type: PaymentType.CASH,
      isActive: true,
    },
    {
      id: 'pix',
      name: 'Pix',
      type: PaymentType.DIGITAL,
      isActive: true,
    },
    {
      id: 'credit_card',
      name: 'Cartão de Crédito',
      type: PaymentType.CARD,
      isActive: true,
    },
    {
      id: 'debit_card',
      name: 'Cartão de Débito',
      type: PaymentType.CARD,
      isActive: true,
    },
    {
      id: 'boleto',
      name: 'Boleto',
      type: PaymentType.DIGITAL,
      isActive: true,
    },
    {
      id: 'bank_transfer',
      name: 'Transferência Bancária',
      type: PaymentType.DIGITAL,
      isActive: true,
    },
    {
      id: 'voucher',
      name: 'Voucher / Ticket Refeição',
      type: PaymentType.VOUCHER,
      isActive: true,
    },
    {
      id: 'check',
      name: 'Cheque',
      type: PaymentType.CASH, // tipo CASH por ser pagamento físico
      isActive: true,
    },
    {
      id: 'other',
      name: 'Outro',
      type: PaymentType.OTHER,
      isActive: true,
    },
  ];
