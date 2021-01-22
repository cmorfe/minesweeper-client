import React from 'react';

const Square = ({id, display, onOpened}) => (
  <div id={id} className={'square'} onClick={onOpened}>
    {display}
  </div>
)

export default Square;