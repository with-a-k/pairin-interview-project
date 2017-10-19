import React from 'react';
import PropTypes from 'prop-types';

export default class AdjectiveCard extends React.Component {
  render () {
    return (
      <div className={`adjective-card ${this.props.accurate ? "applicable" : "not-applicable"}`}>
        <input type='checkbox'
               name={`${this.props.adjective.toLowerCase().replace(' ','_')}/present`}
               checked={this.props.accurate}
               onClick={this.props.toggle}/>
        <label onClick={this.props.playAudioGuide}>(S)</label>
        <h4>{this.props.adjective}</h4>
        <input type='checkbox'
               hidden={this.props.part < 2}
               name={`${this.props.adjective.toLowerCase().replace(' ','_')}/goal`}
               checked={this.props.goal}
               onClick={this.props.toggle}/>
        <div hidden={!this.props.showDefinition}>{this.props.definition}</div>

      </div>
    );
  }
}

AdjectiveCard.defaultProps = {
  showDefinition: false,
  accurate: false
}

AdjectiveCard.propTypes = {
  //The adjective displayed on the card.
  adjective: PropTypes.string.isRequired,
  //The textual description of that adjective.
  definition: PropTypes.string.isRequired,
  //Part of a URL necessary to get an audio file.
  audioKey: PropTypes.string.isRequired,
  //Whether to show or hide the definition.
  showDefinition: PropTypes.bool,
  //Whether the user has indicated that the adjective is accurate to them.
  accurate: PropTypes.bool,
  //Whether the user has indicated that they would like to have this apply to them in the future.
  goal: PropTypes.bool,
  //Changes the parent state of a checkbox (present or goal).
  toggle: PropTypes.func,
  //Changes the visibility of the definition.
  toggleDefinition: PropTypes.func,
  //Plays the audio file for the adjective.
  playAudioGuide: PropTypes.func,
  //Whether the survey should show goal checks.
};
