import { Action, Store } from "redux";

const logger = (store: any) => (next: any) => (action: any): any => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

export default logger;
