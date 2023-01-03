import React from "react";
import Grid from "@mui/material/Grid";
import GridWapper from '../components/common/GridWrapper/GridWrapper';
import BasicSnackbar from "../components/common/BasicSnackbar/BasicSnackbar";
import CommonButton from "../components/common/CommonButton/CommonButton";

const MachineLearning = () => {
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
      This is MachineLearning page
      <CommonButton variant="contained" onClick={handleClick}>
        Open success snackbar
      </CommonButton>
      <BasicSnackbar
      open = {open}
      onClose = {handleClose}
      severity = "error"
      message= "Error Msg"
      />
    </GridWapper>
  )
}

export default MachineLearning;
