import React, { useEffect, useContext } from "react";
import Context from "../../utils/context";
import { PAGE_UNLOAD } from "../../store/actions/actionTypes";

const Profile = () => {
  const { dispatch } = useContext(Context);
  useEffect(() => {
    return () => {
      dispatch({ type: PAGE_UNLOAD });
    };
  });
  return <p>Profile Component..!!</p>;
};

export default Profile;
