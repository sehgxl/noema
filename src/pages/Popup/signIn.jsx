import { randomBytes, createHash } from "crypto-browserify";

const signIn = async (setLoggedIn) => {
  console.log("begin sign in ");
  const extension_id = chrome.runtime.id;
  const client_id = "9a6u0bQGidlX8qfV421ArARvZwvfzWL0";
  const domainName = "dev-au5731za0o1q03g4.us.auth0.com";

  const result = await chrome.storage.sync.get(["AUTH_ACCESS_TOKEN"]);

  if (result.AUTH_ACCESS_TOKEN === undefined) {
    //First Time Login
    console.log("first time login");
    const base64URLEncode = (str) => {
      return str
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
    };

    const verifier = base64URLEncode(randomBytes(32));

    const sha256 = (buffer) => {
      return createHash("sha256").update(buffer).digest();
    };
    const challenge = base64URLEncode(sha256(verifier));
    const authURL = await chrome.identity.launchWebAuthFlow({
      interactive: true,
      url: `https://${domainName}/authorize?redirect_uri=https://${extension_id}.chromiumapp.org/auth0&response_type=code&client_id=${client_id}&scope=offline_access&code_challenge=${challenge}&code_challenge_method=S256`,
    });
    console.log("authURL", authURL);

    //We get the authCode from the url string.
    const authCode = authURL.split("?")[1].replace("code=", "");
    const getTokens = await fetch(`https://${domainName}/oauth/token`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: `${client_id}`,
        code_verifier: verifier,
        code: authCode,
        redirect_uri: `https://${extension_id}.chromiumapp.org/auth0`,
      }),
    });

    const Tokens = await getTokens.json();
    console.log("First Time Login Success");
    chrome.storage.sync.set({
      AUTH_ACCESS_TOKEN: Tokens.access_token,
      AUTH_ACCESS_TOKEN_LIFE: Date.now(),
      AUTH_REFRESH_TOKEN: Tokens.refresh_token,
    });

    setLoggedIn(true);
  } else {
    //Not First Time Login

    const getStoredToken = async () => {
      const res = await chrome.storage.sync.get([
        "AUTH_REFRESH_TOKEN",
        "AUTH_ACCESS_TOKEN_LIFE",
      ]);

      return [res.AUTH_REFRESH_TOKEN, res.AUTH_ACCESS_TOKEN_LIFE];
    };
    const [RefreshToken, AccessTokenLife] = await getStoredToken();

    //If time elapsed of the access token is >= 23 hrs, get a new access token.
    if (Math.floor((Date.now() - AccessTokenLife) / 1000) >= 82800) {
      const GetNewTokens = await fetch(`https://${domainName}/oauth/token`, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: `${client_id}`,
          refresh_token: RefreshToken,
        }),
      });
      const NewTokens = await GetNewTokens.json();

      await chrome.storage.sync.remove([
        "AUTH_ACCESS_TOKEN",
        "AUTH_ACCESS_TOKEN_LIFE",
        "AUTH_REFRESH_TOKEN",
      ]);
      await chrome.storage.sync.set({
        AUTH_ACCESS_TOKEN: NewTokens.access_token,
        AUTH_ACCESS_TOKEN_LIFE: NewTokens.expires_in,
        AUTH_REFRESH_TOKEN: NewTokens.refresh_token,
      });
    }
    setLoggedIn(true);
  }
};

export default signIn;
