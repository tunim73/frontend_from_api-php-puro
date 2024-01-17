export interface User {
  id: number;
  name: string;
  email: string;
  cpf: string | null;
  address: string | null;
  city: string | null;
  uf: string | null;
  type: number
}
