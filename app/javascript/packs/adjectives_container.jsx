import React from 'react';
import PropTypes from 'prop-types';
import AdjectiveCard from './adjective_card';
import adjectivesMaster from './constants/adjectives.json';

class AdjectivesContainer extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    let adjectives = this.props.survey;
    let handleSurveyItemChange = this.props.handleSurveyItemChange;
    let self = this;
    return (
      <div className="adjective-container">
        <p>If you would describe your current self with one of these adjectives, check the box to its left.</p>
        <p hidden={this.props.part < 2}>If you would describe your ideal self with one of these adjectives, check the box to its right.</p>
        {adjectivesMaster.adjectives.map(function(adjective) {
          return (
            <AdjectiveCard
              key={adjective.id}
              part={self.props.part}
              audioKey={adjective.audio_key}
              adjective={adjective.name.english}
              definition={adjective.definition.english}
              accurate={adjectives.present[adjective.name.english.toLowerCase().replace(' ','_')]}
              goal={adjectives.goal[adjective.name.english.toLowerCase().replace(' ','_')]}
              toggle={handleSurveyItemChange}
              />
          );
        })}
      </div>
    );
  }
}

AdjectivesContainer.propTypes = {
  survey: PropTypes.object,
  handleSurveyItemChange: PropTypes.func
};

export default AdjectivesContainer;
