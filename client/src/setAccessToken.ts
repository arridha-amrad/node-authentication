export let AccessToken = ""

export const setAccessToken = (s: string) => {
  AccessToken = s;
};

export const getAcessToken = () => {
  return AccessToken;
};
