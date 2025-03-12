import React from "react";
import Header from "./Header";
import Footer from "./Footer";
function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
