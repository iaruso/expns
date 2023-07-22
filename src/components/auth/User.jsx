import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Login";
import LogoutButton from "./Logout";

const User = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user && user.sub) {
      const userId = user.sub.split('|')[1];
      console.log(user.sub);
    }
  }, [isLoading, isAuthenticated, user]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated ? (
      <>
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.nickname}</p>
          <p>{user.sub}</p>
        </div>
        <LogoutButton />
      </>
    ) : (
      <LoginButton />
    )
  );
};

export default User;
