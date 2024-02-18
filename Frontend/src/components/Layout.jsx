import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import CreateBlog from "./CreateBlog";

const Layout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default Layout;
