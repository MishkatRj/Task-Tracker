import React from "react";
import { useSelector } from "react-redux";
import { Navigate , Outlet  } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const isLogin = useSelector((state) => state?.authReducer?.isLogin);
  if (!isLogin) {
    return [<Navigate to="/login" replace />, toast.error("Please Login First")];
  } else {
    return <Outlet />;
  }
  return <></>;
};

export default ProtectedRoute;
