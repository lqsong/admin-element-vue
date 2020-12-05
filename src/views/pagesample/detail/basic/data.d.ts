export interface UserInfoDataType {
  name: string;
  tel: string;
  courier: string;
  address: string;
  remark: string;
}

export interface RefundApplicationDataType {
  ladingNo: string;
  saleNo: string;
  state: string;
  childOrders: string;
}

export interface ReturnGoodsDataType {
  id: string;
  name?: string;
  barcode?: string;
  price?: string;
  num?: string | number;
  amount?: string | number;
}

export interface ReturnProgressDataType {
  key: string;
  time: string;
  rate: string;
  status: string;
  operator: string;
  cost: string;
}

export interface DetailDataType {
  userInfo: UserInfoDataType;
  refundApplication: RefundApplicationDataType;
  returnGoods: ReturnGoodsDataType[];
  returnProgress: ReturnProgressDataType[];
}
