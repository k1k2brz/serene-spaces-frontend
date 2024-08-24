export type Tokens = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

const setCookie = (name: string, value: string, days: number) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
};

export const saveUserTokens = (credentials: Tokens) => {
  const data = JSON.stringify(credentials);

  setCookie('user', data, 1);
};
