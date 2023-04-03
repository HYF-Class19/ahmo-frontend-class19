import React from 'react'
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
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
  backgroundColor: '#black',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 32,
    height: 32,
    backgroundImage: 'radial-gradient(#F3FB8C,#F3FB8C 38%,transparent 28%)',
    content: '""',
  },
  'input:hover ~ &': {
    opacity: 0.8,
  },
});


const CustomRadio = (props: RadioProps) => {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  )
}

export default CustomRadio