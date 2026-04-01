export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
}

export type IUsersResponse = Array<IUser>;

export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

export interface IGeo {
  lat: string;
  lng: string;
}
export interface IUserWithStatus extends IUser {
  status: 'active' | 'archived';
}

export interface IUserFormData {
  name: string;
  username: string;
  email: string;
  city: string;
  phone: string;
  companyName: string;
}
