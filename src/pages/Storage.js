import React from "react";
import GridWapper from '../components/common/GridWrapper/GridWrapper';
import BasicSnackbar from "../components/common/BasicSnackbar/BasicSnackbar";
import BasicCard from "../components/common/BasicCard/BasicCard";
import UserTable from "../components/UserTable/UserTable";
const Storage = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <GridWapper>
     <BasicCard 
          content={<UserTable onError={() => setOpen(true)} />}
        />
        <BasicSnackbar
          open={open}
          severity="error"
          message="Data couldn't be fetched"
          onClose={handleClose}
        />
    </GridWapper>
  )
};

export default Storage;
