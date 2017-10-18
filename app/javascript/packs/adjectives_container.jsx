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
    return (
      <div>
        {adjectivesMaster.adjectives.map(function(adjective) {
          return (
            <AdjectiveCard
              key={adjective.id}
              audioKey={adjective.audio_key}
              adjective={adjective.name.english}
              definition={adjective.definition.english}
              showDefinition={false}
              accurate={false}
              />
          );
        })}
      </div>
    );
  }
}

AdjectivesContainer.propTypes = {
  adjectives: PropTypes.object
};

export default AdjectivesContainer;
