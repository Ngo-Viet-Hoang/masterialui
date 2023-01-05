import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Grid from "@mui/material/Grid";
import { Outlet, useLocation } from "react-router";

const Layout = () => {
  const [title, setTitle] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const parsedTitle = location.pathname.replace(/\W/g, " ");
    setTitle(parsedTitle);
  }, [location]);

  return (
    <Grid container>
      <Navbar />
      <Header title={title} />
      <Outlet />
    </Grid>
  );
};

export default Layout;
