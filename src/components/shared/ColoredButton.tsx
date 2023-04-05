import React from 'react'
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { purple } from '@mui/material/colors';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[700]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));



const ColoredButton = (props: any) => {
  return (
    <ColorButton {...props}>
        {props.children}
    </ColorButton>
  )
}

export default ColoredButton