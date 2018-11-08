import React from 'react';
import PropTypes from 'prop-types';

export const MenuRow = ({
  add,
  remove,
  index,
}) => (
  <div className="menu menu--row">
    <button className="menu__bt" title="Add row above" type="button" onClick={() => add(index)}>
      &#9650;
    </button>
    <button className="menu__bt" title="Remove row" type="button" onClick={() => remove(index)}>
      &#215;
    </button>
    <button className="menu__bt" title="Add row below" type="button" onClick={() => add(index + 1)}>
      &#9660;
    </button>
  </div>
);

MenuRow.defaultProps = {
  index: 0,
  remove: () => null,
};

MenuRow.propTypes = {
  add: PropTypes.func.isRequired,
  remove: PropTypes.func,
  index: PropTypes.number,
};

export const MenuCol = ({
  add,
  remove,
  index,
}) => (
  <div className="menu menu--col">
    <button className="menu__bt" title="Add column to the left" type="button" onClick={() => add(index)}>
      &#9668;
    </button>
    <button className="menu__bt" title="Remove column" type="button" onClick={() => remove(index)}>
      &#215;
    </button>
    <button className="menu__bt" title="Add column to the right" type="button" onClick={() => add(index + 1)}>
      &#9658;
    </button>
  </div>
);


MenuCol.defaultProps = {
  index: 0,
  remove: () => null,
};

MenuCol.propTypes = {
  add: PropTypes.func.isRequired,
  remove: PropTypes.func,
  index: PropTypes.number,
};
