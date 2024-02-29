import React from "react";
const MainCard = (props) => {
  return (
    <div className="border border-2 border-secondary-subtle br-20 h-90 mt-7 mx-3 p-3 gap-3">
      <h1 className="m-3 fw-bold">{props.title}</h1>
      <div className="m-5">{props.children}</div>
    </div>
  );
};
export default MainCard;
