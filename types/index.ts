export interface CustomerProps {
  id: string;
  name: string;
}

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  category: CategoryProps;
  image: any;
  isAvailable: boolean;
}

export interface CategoryProps {
  id: string;
  name: string;
}
