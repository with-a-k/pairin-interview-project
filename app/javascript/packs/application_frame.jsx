import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import ActionButton from './action_button';
import AdjectivesContainer from './adjectives_container';
import UserIdentifier from './user_identifier';
import adjectivesMaster from './constants/adjectives.json';

class ApplicationFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //default null, change this later
      userid: 2,
      firstName: "",
      lastName: "",
      email: "",
      gender: "Other",
      errors: [],
      survey: this.skeletonSurvey()
    }
    this.requester = axios.create({
      baseURL: '/api/v1',
      timeout: 1000,
      xsrfHeaderName: 'X-CSRF-TOKEN'
    })
  }

  handleFieldChange(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSurveyItemChange(event) {
    let target = event.target;
    let value = target.checked;
    let name = target.name.split('/');
    let adj = name[0];
    let branch = name[1];
    let update = this.state.survey;
    update[branch][adj] = value;
    this.setState({
      survey: update
    });
  }

  skeletonSurvey() {
    let survey = {
      present: {},
      goal: {}
    }
    adjectivesMaster.adjectives.forEach(function(adj) {
      let name = adj.name.english.toLowerCase().replace(' ', '_');
      survey.present[name] = false;
      survey.goal[name] = false;
    });
    return survey;
  }

  searchForUser(user) {
    let self = this;
    self.requester({
      method: 'get',
      url: '/users.json',
      params: {
        email: user.email
      },
      responseType: 'json'
    })
    .then(function(response) {
      console.log(response);
      self.setState({
        userid: response.data.id,
        firstName: response.data.firstname,
        lastName: response.data.lastname,
        gender: response.data.gender,
        email: response.data.email
      });
    })
    .catch(function(error) {
      self.createUser(user);
    });
  }

  createUser(user) {
    let self = this;
    self.requester({
      method: 'post',
      url: '/users.json',
      params: {
        user: user
      }
    })
    .then(function(response) {
      self.setState({
        userid: response.data.id,
        firstName: response.data.firstname,
        lastName: response.data.lastname,
        gender: response.data.gender,
        email: response.data.email
      })
    })
    .catch(function(error) {
      self.setState({errors: error.response.data.errors});
    });
  }

  signUser(event) {
    let user = {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      email: this.state.email,
      gender: this.state.gender
    }
    this.searchForUser(user);
  }

  signOut(event) {
    this.setState({
      userid: null,
      firstName: "",
      lastName: "",
      email: "",
      gender: "Other"
    })
  }

  render() {
    return (
      <div>
        {this.state.userid ?
          (<div>
             <AdjectivesContainer survey={this.state.survey ?
                this.state.survey :
                this.skeletonSurvey()}
                handleSurveyItemChange={this.handleSurveyItemChange.bind(this)}/>
             <ActionButton label='Sign Out'
                           action={this.signOut.bind(this)}/>
           </div>) :
          (<UserIdentifier
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              email={this.state.email}
              gender={this.state.gender}
              handleChange={this.handleFieldChange.bind(this)}
              errors={this.state.errors}
              submitForm={this.signUser.bind(this)}/>)}
      </div>
    )
  }
}

ApplicationFrame.propTypes = {
  name: PropTypes.string
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ApplicationFrame/>,
    document.body.appendChild(document.createElement('div')),
  )
})
