// import { makeCall } from "../api";
import { makeCall } from "../api/productsMockApi";
export const CALL_API = "CALL_API";

const apiMiddleware = store => next => action => {
  const callApi = action[CALL_API];
  if( typeof callApi === "undefined") return next(action);

  const [requestStartedType, successType, failureType] = callApi.types;

  next({type: requestStartedType});

  return makeCall({
    method: callApi.method,
    body: callApi.body,
    endpoint: callApi.endpoint
  })
    .then( 
      res => {
        next({type: successType, payload: res.data})
      },
      err => {
        next({type: failureType, payload: err.message})
      }
    )
}



export default apiMiddleware;