import { styled, TextField } from "@mui/material";

export const QFormTextField = styled(TextField)(() => ({
  "& .MuiFilledInput-root": {
    borderRadius: "1.6rem",
    backgroundColor: "#F6F7FB",
    //color: "#f44336",
  },
  "& .MuiFormLabel-root-MuiInputLabel-root.Mui-error": {
    color: "#f44336",
  },

  "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
    border: "none",
  },

  "& .MuiFilledInput-underline:before": {
    border: "none",
  },
  "& .MuiFilledInput-underline:after": {
    border: "none",
  },
}));
