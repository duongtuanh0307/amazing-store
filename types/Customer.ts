export type CustomerInfoType = {
  firstName: string;
  lastName: string;
  email: string;
};

export type ShippingInfoType = {
  receiver: string;
  street: string;
  postalZipCode: string;
  city: string;
  country: string;
  province: string;
  shippingOption: string;
};

export type PaymentInfoType = {
  cardNum: string;
  expMonth: string;
  expYear: string;
  cvv: string;
  billingPostalZipcode: string;
};
