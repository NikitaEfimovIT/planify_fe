import {
  CREATE_RESPONSE_F,
  CREATE_RESPONSE_R,
  CREATE_RESPONSE_S,
  ResponseData,
} from "@src/store/response/responseTypes";
import apiClientService from "@src/axios/ApiClientService";

export const makeResponse = (data: any) => (dispatch: any) => {
  dispatch({ type: CREATE_RESPONSE_R });
  // console.log(data);
  apiClientService
    .post("api/respond/", data, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res) => dispatch({ type: CREATE_RESPONSE_S }))
    .catch((e) => dispatch({ type: CREATE_RESPONSE_F }));
};
