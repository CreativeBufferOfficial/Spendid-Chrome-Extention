import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import {
  userReducer,
  lendingReducer,
  demographicsGenerateReducer,
  budgetGenerateReducer,
  scoresGenerateReducer,
  saveReportReducer,
} from '../reducer/reducers';

let initialState = {};
const reducer = combineReducers({
  user: userReducer,
  lending: lendingReducer,
  demographics: demographicsGenerateReducer,
  budget: budgetGenerateReducer,
  score: scoresGenerateReducer,
  report: saveReportReducer,
});

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
