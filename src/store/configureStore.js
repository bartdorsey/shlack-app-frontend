import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import authentication from "./reducers/authentication";
import channel from "./reducers/channel";
import group from "./reducers/group";
import channelMessages from "./reducers/channelMessages";
import user from "./reducers/user";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  authentication,
  channel,
  group,
  channelMessages,
  user
});

const configureStore = (initialState) => {
  return createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
