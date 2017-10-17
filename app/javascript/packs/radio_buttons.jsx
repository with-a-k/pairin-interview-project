import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const RadioButtons = (props) => {
  return (
    <div>
      {props.names.map((name, i) => {
        return <label key={`${name}${i}`}>{name}<input type="radio"
                                   name={props.setName}
                                   value={name}
                                   checked={name == props.value}
                                   onChange={props.handleChange}/>
               </label>
      })}
    </div>
  )
}

RadioButtons.propTypes = {
  value: PropTypes.string.isRequired,
  setName: PropTypes.string.isRequired,
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default RadioButtons;
