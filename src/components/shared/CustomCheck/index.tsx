import React from 'react'
import { styled } from '@mui/material/styles';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 6,
  width: 32,
  border: '1px solid gray',
  height: 32,
  padding: 0,
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: '#30404d',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'rgba(57,75,89,.5)' ,
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: 'black',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 32,
    height: 32,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    opacity: 0.8,
  },
});
  

const CustomCheck = (props: CheckboxProps) => {
    return (
        <Checkbox
          sx={{
            '&:hover': { bgcolor: 'transparent' },
          }}
          disableRipple
          color="default"
          checkedIcon={<BpCheckedIcon />}
          icon={<BpIcon />}
          {...props}
        />
      );
}

export default CustomCheck