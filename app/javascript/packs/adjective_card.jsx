import React from 'react';
import PropTypes from 'prop-types';

class AdjectiveCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDefinition: false
    }
  }

  toggleDefinition (event) {
    this.setState({showDefinition: !this.state.showDefinition});
  }

  relevantGroup() {
    return this.props.part == 2 ? 'goal' : 'present';
  }

  render () {
    return (
      <div className={`adjective-card ${this.props.accurate ? "applicable" : "not-applicable"}`}>
        <div className="controls-row">
          <div className="left-control">
            <input type='checkbox'
                  name={`${this.props.adjective.toLowerCase().replace(' ','_')}/present`}
                  checked={this.props.accurate}
                  onChange={this.props.toggle}/>
            <span className="fa fa-fw fa-play-circle"
                  data-audiokey={this.props.audioKey}
                  onClick={this.props.playAudioGuide}/>
          </div>
          <div className="middle-control">
            <h4>{this.props.adjective}</h4>
          </div>
          <div className="right-control">
            <span className="fa fa-fw fa-question-circle" onClick={this.toggleDefinition.bind(this)}/>
            <input type='checkbox'
                  hidden={this.props.part < 2}
                  name={`${this.props.adjective.toLowerCase().replace(' ','_')}/goal`}
                  checked={this.props.goal}
                  onChange={this.props.toggle}/>
          </div>
        </div>
        <div className="definition" hidden={!this.state.showDefinition}>{this.props.definition}</div>

      </div>
    );
  }
}

AdjectiveCard.propTypes = {
  //The adjective displayed on the card.
  adjective: PropTypes.string.isRequired,
  //The textual description of that adjective.
  definition: PropTypes.string.isRequired,
  //Part of a URL necessary to get an audio file.
  audioKey: PropTypes.string.isRequired,
  //Whether the user has indicated that the adjective is accurate to them.
  accurate: PropTypes.bool,
  //Whether the user has indicated that they would like to have this apply to them in the future.
  goal: PropTypes.bool,
  //Changes the parent state of a checkbox (present or goal).
  toggle: PropTypes.func,
  //Plays the audio file for the adjective.
  playAudioGuide: PropTypes.func,
  //Whether the survey should show goal checks.
};

export default AdjectiveCard;
