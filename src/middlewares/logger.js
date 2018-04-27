const logger = (store) => (next) => (action) => {
  console.group(action.type);
    console.log('The action: ', action);
    const returnVal = next(action);
    console.log('The new State: ', store.getState());
  console.groupEnd();
  return returnVal;
}

export default logger;
