import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const ActionButton = (props) => {
  return (
    <div className="button">
      <p onClick={props.action}>{props.label}</p>
    </div>
  )
}

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
}

export default ActionButton;
