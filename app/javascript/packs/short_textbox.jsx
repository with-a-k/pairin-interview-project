import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const ShortTextbox = (props) => {
  return (
    <div>
      <input type="text"
             name={props.name}
             value={props.value}
             onChange={props.handleChange}/>
    </div>
  )
}

ShortTextbox.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default ShortTextbox;
