import {
  CREATE_RESPONSE_F,
  CREATE_RESPONSE_R,
  CREATE_RESPONSE_S,
  DefaultResponseState,
  OPEN_RESPONSE_MODAL,
} from "@src/store/response/responseTypes";

const defaultState: DefaultResponseState = {
  error: false,
  isSending: false,
  success: false,
  open: false,
};

export const responseReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case CREATE_RESPONSE_R:
      return { ...state, isSending: true, success: false, error: false };
    case CREATE_RESPONSE_S:
      return { ...state, isSending: false, success: true, error: false, open: false };
    case CREATE_RESPONSE_F:
      return { ...state, isSending: false, success: false, error: true };
    case OPEN_RESPONSE_MODAL:
      return { ...state, open: !state.open, error: false, success: false, isSending: false };
    default:
      return state;
  }
};
