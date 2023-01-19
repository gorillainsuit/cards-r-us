import { useState, useEffect } from 'react';

interface User {
  username: string | null;
  email?: string | null;
  avatar?: string | null;
  name?: string | null;
  userId: string | null;
}

interface LoginInformation {
  isLoggedIn: boolean;
  user: User | null;
}

export default function useLoginState() {
  const [loginInformation, setLoginInformation] = useState<LoginInformation>({
    isLoggedIn: false,
    user: null,
  });

  /**
   *
   * @param {{
   * username: string | null,
   * email?: string | null,
   * avatar?: string | null,
   * name?: string | null,
   * userId: string | null,
   * }} user
   */
  const updateLogin = (user: User) => {
    const defaultUser = {
      username: null,
      email: null,
      avatar: null,
      name: null,
      userId: null,
    };
    setLoginInformation({
      isLoggedIn: user?.userId !== null,
      user: { ...defaultUser, ...user },
    });
  };

  return {
    isLoggedIn: loginInformation.isLoggedIn,
    user: loginInformation.user,
    updateLogin,
  };
}
