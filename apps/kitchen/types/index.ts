export type ProductProps = {
  id: string;
  name: string;
  price: number;
  category: CategoryProps;
  description?: string;
  image?: string;
  isAvailable: boolean;
};

export type CategoryProps = {
  id: string;
  name: string;
};

export type StaffProps = {
  id: string;
  first_name: string;
  last_name: string;
};
export type TableProps = {
  id?: string;
  number: number;
};
export type PaymentMethodProps = {
  id?: string;
  paymentType: string;
};
export type CustomerProps = {
  id?: string;
  name: string;
};
export type TransactionProps = {
  id: string;
  customer: CustomerProps;
};
export type StatusProps = {
  id: number;
  status: string;
};

export type OrderProps = {
  id: string;
  date: string;
  staff?: StaffProps;
  table: TableProps;
  status?: StatusProps;
  paymentMethod?: PaymentMethodProps;
  totalAmount: number;
  transaction?: TransactionProps;
};
