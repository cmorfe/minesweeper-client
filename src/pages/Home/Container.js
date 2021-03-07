import React, {useState} from "react";
import {Game, SelectGame} from "./components";

import "./styles.scss";

const Container = ({token, showSuccess, showError}) => {
  const [board, setBoard] = useState(null);

  return board
    ? <Game {...{token, board, setBoard, showError}}/>
    : <SelectGame {...{token, setBoard, showSuccess, showError}}/>;
};

export default Container;
