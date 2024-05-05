import React from "react";

const Header = () => {
  return (
    <>
      <div
        className="font-montserrat font-600"
        style={{
          height: "50px",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          padding: "4px 20px",
          borderBottom: "1px solid",
          width: "100vw",
          backgroundColor: "#226957",
          color: "white",
        }}
      >
        Admin View
      </div>
    </>
  );
};

export default Header;
