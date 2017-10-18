import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ShortTextbox from './short_textbox';
import RadioButtons from './radio_buttons';
import ActionButton from './action_button';

class UserIdentifier extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label>First Name:</label><ShortTextbox name="firstName"
          value={this.props.firstName}
          handleChange={this.props.handleChange}/>
        <label>Last Name:</label><ShortTextbox name="lastName"
          value={this.props.lastName}
          handleChange={this.props.handleChange}/>
        <label>Email:</label><ShortTextbox name="email"
          value={this.props.email}
          handleChange={this.props.handleChange}/>
        <RadioButtons names={["Male", "Female", "Other"]}
          setName={"gender"}
          value={this.props.gender}
          handleChange={this.props.handleChange}/>
          {this.props.errors.map((error, index) => {
            return (
              <div key={index} className="error">
                {error.replace('name', ' Name') + '.'}
              </div>
            )
          })}
        <ActionButton
          label="Sign In"
          action={this.props.submitForm}/>
      </div>
    )
  }
}

UserIdentifier.propTypes = {
  handleChange: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired
}

export default UserIdentifier;
