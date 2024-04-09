import { CHANGE_SHARE_MODAL_STATE, DefaultState } from "@src/store/modals/modalsTypes";

const defaultState: DefaultState = {
  openShareModal: false,
};

export const modalsReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case CHANGE_SHARE_MODAL_STATE:
      return { ...state, openShareModal: !state.openShareModal };
    default:
      return state;
  }
};
