import React from 'react';
import PropTypes from 'prop-types';

export default class AdjectiveCard extends React.Component {
  render () {
    return (
      <div className={`${this.props.accurate ? "applicable" : "not-applicable"}`}>
        <input type='checkbox'
               name={this.props.adjective}
               checked={this.props.accurate}
               onClick={this.props.togglePresent}/>
        <label onClick={this.props.playAudioGuide}>(S)</label>
        <h4>{this.props.adjective}</h4>
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
  //Changes the parent state of this adjective's Present value from true to false.
  togglePresent: PropTypes.func,
  //Changes the parent state of this adjective's Goal value from true to false.
  toggleGoal: PropTypes.func,
  //Changes the visibility of the definition.
  toggleDefinition: PropTypes.func,
  //Plays the audio file for the adjective.
  playAudioGuide: PropTypes.func
};
