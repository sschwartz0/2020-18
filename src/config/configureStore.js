import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer } from "../rootReducer";

const middlewares = [];

export function configureStore() {
  if (process.env.NODE_ENV === "development") {
    const store = createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(...middlewares))
    );

    if (module.hot) {
      module.hot.accept("../rootReducer", () => {
        const nextRootReducer = require("../rootReducer").default;

        store.replaceReducer(nextRootReducer);
      });
    }

    return store;
  }

  return createStore(rootReducer, applyMiddleware(...middlewares));
}