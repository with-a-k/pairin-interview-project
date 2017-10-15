class AdjectivesContainer extends React.Component {
  render () {
    let adjectives = this.props.adjectives.adjectives;

    return (
      <div>
        {Object.keys(adjectives).map(function(id) {
          return (
            <AdjectiveCard
              key={id}
              adjective={adjectives[id].names.english}
              definition={adjectives[id].definition.english}
              showDefinition=false
              accurate=false
              />
          );
        })}
      </div>
    );
  }
}

AdjectivesContainer.propTypes = {
  adjectives: React.PropTypes.object
};