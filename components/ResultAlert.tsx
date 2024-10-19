import React from "react";
import {Alert} from "@mui/material";

interface ResultAlertProps {
  type: "success" | "error";
  message: string;
}

const ResultAlert: React.FC<ResultAlertProps> = ({type, message}) => {
  return (
    <Alert
      severity={type}
      sx={{
        "& .MuiAlert-message": {
          margin: "auto 0",
        },
      }}
    >
      {message}
    </Alert>
  );
};

export default ResultAlert;
