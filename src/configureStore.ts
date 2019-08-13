import { routerMiddleware } from "connected-react-router";
import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import { History } from "history";
import { ApplicationState, createRootReducer, rootSaga } from "./store";

export default function configureStore(
  history: History,
  initialState: ApplicationState,
): Store<ApplicationState> {
  const composeEnhancers = composeWithDevTools({});

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
  );

  sagaMiddleware.run(rootSaga);
  return store;
}
