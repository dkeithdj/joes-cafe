export interface ProductProps {
  id: string;
  name: string;
  price: number;
  category: CategoryProps;
  description?: string;
  image?: string;
  isAvailable: boolean;
}

export interface CategoryProps {
  id: string;
  name: string;
}

export interface StaffProps {
  id: string;
  first_name: string;
  last_name: string;
}
export interface TableProps {
  number: number;
}
export interface PaymentMethodProps {
  paymentType: string;
}
export interface TransactionProps {
  id: string;
}
export interface OrderProps {
  id: string;
  date: string;
  staff?: StaffProps;
  table: TableProps;
  paymentMethod?: PaymentMethodProps;
  totalAmount: number;
  transaction?: TransactionProps;
}
