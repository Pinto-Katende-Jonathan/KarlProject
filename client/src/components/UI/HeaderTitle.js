import React from "react";

function HeaderTitle(props) {
  return (
    <>
      <h1 className="titre1" align="center">
        {props.title}
      </h1>
    </>
  );
}

export default HeaderTitle;
