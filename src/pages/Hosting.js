import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Box from "@mui/material/Box";
import { cardHeaderStyles } from './Authentication/styles';
import GridWrapper from '../components/common/GridWrapper/GridWrapper';
import CommonButton from '../components/common/CommonButton/CommonButton';

export default function Hosting() {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open,  severity } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const buttons = (
    <React.Fragment>
      <CommonButton variant="contained"
        onClick={handleClick({
          vertical: 'top',
          horizontal: 'right',
        })}
      >
        Top-Right
      </CommonButton>
    </React.Fragment>
  );

  return (
    <GridWrapper>
      {buttons}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Success"
        key={vertical + horizontal}
      />
    </GridWrapper>
  );
}