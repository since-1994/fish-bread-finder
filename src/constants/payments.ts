export interface I_PAYMENTS {
  CASH: string;
  ACCOUNT_TRANSFER: string;
  CARD: string;
}

export const PAYMENTS: I_PAYMENTS = {
  CASH: "현금",
  ACCOUNT_TRANSFER: "계좌 이체",
  CARD: "카드",
};
