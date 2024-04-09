export const CREATE_RESPONSE_R = "CREATE_RESPONSE_R";
export const CREATE_RESPONSE_S = "CREATE_RESPONSE_S";
export const CREATE_RESPONSE_F = "CREATE_RESPONSE_F";

export const OPEN_RESPONSE_MODAL = "OPEN_RESPONSE_MODAL";
export interface ResponseData {
  name: string;
  availableTimes: any[];
}

export interface DefaultResponseState {
  open: boolean;
  isSending: boolean;
  error: boolean;
  success: boolean;
}
