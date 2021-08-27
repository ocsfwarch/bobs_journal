const checkForLocalStorage = async () => {
  let bReturn = false;
  const strTest = "TEST";
  let bOk = false;
  try {
    if ("localStorage" in window && window["localStorage"] !== null) {
      try {
        try {
          // Needed to add this 2nd try to catch error if private mode is enabled.
          localStorage.setItem(strTest, strTest);
          bOk = true;
        } catch (e) {}
        if (bOk) {
          localStorage.removeItem(strTest);
          bReturn = true;
        }
      } catch (e) {
        return bReturn;
      }
    }
  } catch (e) {
    return bReturn;
  }
  return bReturn;
};

export { checkForLocalStorage };
