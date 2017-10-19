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
      userid: null,
      firstName: "",
      lastName: "",
      email: "",
      gender: "Other",
      errors: [],
      survey: {},
      part: 0,
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

  unzipSurvey(survey) {
    let unzipped = {
      present: {},
      goal: {}
    }
    Object.keys(survey).forEach(function(key) {
      let lastUnderscoreIndex = key.lastIndexOf('_');
      if (lastUnderscoreIndex == -1) {
        //do nothing
      } else {
        let name = key.slice(0, lastUnderscoreIndex);
        let group = key.slice(lastUnderscoreIndex+1);
        if (group == "present" || group == "goal") {
          unzipped[group][name] = survey[key];
        }
      }
    });
    return unzipped;
  }

  submitSurvey() {
    let submission = {}
    let self = this;
    let survey = self.state.survey;
    adjectivesMaster.adjectives.forEach(function(adj) {
      let name = adj.name.english.toLowerCase().replace(' ','_');
      submission[`${name}_present`] = survey.present[name];
    });
    self.requester({
      method: 'post',
      url: '/survey.json',
      params: {
        userid: self.state.userid,
        survey: submission
      },
      responseType: 'json'
    }).then(function(response) {
      let futureSurveyState = self.state.survey;
      Object.keys(survey.present).forEach(function(key) {
        futureSurveyState.goal[key] = survey.present[key];
      });
      self.setState({
        survey: futureSurveyState,
        surveyid: response.data.id,
        part: 2
      })
    })
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
      self.setState({
        userid: response.data.id,
        firstName: response.data.firstname,
        lastName: response.data.lastname,
        gender: response.data.gender,
        email: response.data.email,
        survey: self.unzipSurvey(response.data.most_recent_survey),
        surveyid: response.data.most_recent_survey.id,
        part: 1
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
        email: response.data.email,
        survey: self.unzipSurvey(response.data.most_recent_survey),
        part: 1
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
    this.submitSurvey();
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
             <AdjectivesContainer survey={this.state.survey}
               handleSurveyItemChange={this.handleSurveyItemChange.bind(this)}
               part={this.state.part}/>
             <ActionButton label='Submit'
                           action={this.submitSurvey.bind(this)}/>
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
