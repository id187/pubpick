import { useState } from "react";

export const useLoginRequired = () => {
  const [showModal, setShowModal] = useState(false);

  const checkLogin = () => {
    const isLoggedIn = !!localStorage.getItem("accessToken");
    if (!isLoggedIn) {
      setShowModal(true);
      return false;
    }
    return true;
  };

  return { showModal, setShowModal, checkLogin };
};
