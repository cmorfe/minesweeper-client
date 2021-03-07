import React from "react";

const Square = ({id, display, onOpened, classes}) => (
  <div id={id} className={classes} onClick={onOpened}>
    {display}
  </div>
);

export default Square;
