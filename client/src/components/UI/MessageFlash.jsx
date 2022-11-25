import React from "react";
import { Alert } from "@mui/material";

function MessageFlash(props) {
  return (
    <div className="group">
      <Alert
        variant="filled"
        severity={props.type}
        onClose={() => props.setMessage(null)}
      >
        {props.message}
      </Alert>
      <br />
    </div>
  );
}

export default MessageFlash;
