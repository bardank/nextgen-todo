export const getCookie = (name: string) => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name))
    ?.split("=")[1];
  return cookie;
};

export const setCookie = (name: string, value: string, expiresAt: Date) => {
  document.cookie = `${name}=${value}; expires=${expiresAt}; path=/`;
};


export const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  
}

