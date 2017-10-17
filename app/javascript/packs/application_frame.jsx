import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import AdjectivesContainer from './adjectives_container';
import UserIdentifier from './user_identifier';
import SurveyPresent from './survey_present';
import SurveyGoals from './survey_goals';

class ApplicationFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userid: null }
  }

  receiveUserId(id) {

  }

  render() {
    return (
      <div>
        {this.state.userid ? (<h2>User found</h2>) : (<UserIdentifier/>)}
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
