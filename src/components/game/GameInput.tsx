import { TextField } from '@mui/material'
import React from 'react'

const GameInput = ({...rest}) => {
  return (
    <TextField
    {...rest}
                variant="filled"
                color="warning"
                margin="normal"
                size="medium"
                type={"text"}
                fullWidth
                autoFocus
                id="outlined-basic"
                sx={{
                  input: { color: "#fff", borderRadius: "20px" },
                  "& input": { color: "" },
                  "& .MuiFormLabel-root": {
                    color: "#F3FB8C",
                    mb: 5,
                  },
                  "& .MuiOutlinedInput-root.Mui-disabled": {
                    "& > fieldset": { border: "1px solid green" },
                  },
                }}
              />
  )
}

export default GameInput