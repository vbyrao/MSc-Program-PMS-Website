import React, { useState, useEffect } from "react";
import MenuItems from "./MenuItems";

const NavBar = () => {
  const [isDialogVisible, setDialogVisible] = useState(false);

  const openDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  useEffect(() => {
    const openDialogButton = document.getElementById("open-dialog-btn");
    const closeDialogButton = document.getElementById("close-dialog-btn");

    if (openDialogButton) {
      openDialogButton.addEventListener("click", openDialog);
    }

    if (closeDialogButton) {
      closeDialogButton.addEventListener("click", closeDialog);
    }

    // Cleanup function
    return () => {
      if (openDialogButton) {
        openDialogButton.removeEventListener("click", openDialog);
      }

      if (closeDialogButton) {
        closeDialogButton.removeEventListener("click", closeDialog);
      }
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <MenuItems />
      </nav>
      <div
        id="dialog-overlay"
        style={{ display: isDialogVisible ? "flex" : "none" }}
      ></div>
    </>
  );
};

export default NavBar;
