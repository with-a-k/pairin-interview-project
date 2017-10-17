import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ShortTextbox from './short_textbox';
import RadioButtons from './radio_buttons';
import ActionButton from './action_button';
import https from 'https';

class UserIdentifier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      gender: "Other"
    }
  }

  handleFieldChange(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }

  submitForm(event) {
    console.log('button push');
  }

  render() {
    return (
      <div>
        <label>First Name:</label><ShortTextbox name="firstName"
          value={this.state.firstName}
          handleChange={this.handleFieldChange.bind(this)}/>
        <label>Last Name:</label><ShortTextbox name="lastName"
          value={this.state.lastName}
          handleChange={this.handleFieldChange.bind(this)}/>
        <label>Email:</label><ShortTextbox name="email"
          value={this.state.email}
          handleChange={this.handleFieldChange.bind(this)}/>
        <RadioButtons names={["Male", "Female", "Other"]}
          setName={"gender"}
          value={this.state.gender}
          handleChange={this.handleFieldChange.bind(this)}/>
        <ActionButton
          label="Sign In"
          action={this.submitForm}/>
      </div>
    )
  }
}

UserIdentifier.propTypes = {

}

export default UserIdentifier;
