export interface bankObject {
  ACTIVE: number;
  ADDRESS: string;
  ASSET: number;
  CHARTER: string;
  ESTYMD: string;
  FLDOFF: string;
  ID: string;
  NAME: string;
  NETINC: number;
  STNAME: string;
  UNINUM: string;
  WEBADDR: string;
  ZIP: string;
  CITY: string;
}

export interface Bank {
  data: bankObject;
}
