const logout = async (setLoggedIn) => {
  chrome.identity.clearAllCachedAuthTokens();
  await chrome.storage.sync.remove([
    "AUTH_ACCESS_TOKEN",
    "AUTH_REFRESH_TOKEN",
    "AUTH_ACCESS_TOKEN_LIFE",
  ]);
  setLoggedIn(false);
};

export default logout;
