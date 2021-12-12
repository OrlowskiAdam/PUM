import React from "react";
import {useSelector} from "../hooks/hooks";

const AuthGuard: React.FC = (props) => {
  const {user} = useSelector((state) => state.user);

  if (!user.isInitialized && !user.isAuthenticated) {
    props.navigation.replace('LoginScreen');
  }

  return (
      <>
        {props.children}
      </>
  )
}

export default AuthGuard;
