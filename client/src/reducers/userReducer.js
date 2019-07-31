import {LOGIN_SUCCESS, CLIENT_LOGOUT} from "../actions/types"

export default function userReducer( state = null, action) {
  if(action.type === LOGIN_SUCCESS) return action.user
  if(action.type === CLIENT_LOGOUT) return null
  return state
}