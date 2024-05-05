import React from "react";
import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";

const MyClass = () => {
  return (
    <>
      <div className="flex flex-row">
        <SideMenu></SideMenu>
        <div className="flex flex-col">
          <Header></Header>
          <div className="flex items-center">fw43 v wf</div>
        </div>
      </div>
    </>
  );
};

export default MyClass;
