let PropTypes = require('prop-types');

class AdjectiveCard extends React.Component {
  render () {
    return (
      <div className={`${this.props.accurate ? "applicable" : "not-applicable"}`}>
        <h4>{this.props.adjective}</h4>
        <div hidden={!this.props.showDefinition}>{this.props.definition}</div>
        <div></div>
      </div>
    );
  }
}

AdjectiveCard.propTypes = {
  //The adjective displayed on the card.
  adjective: PropTypes.string,
  //The textual description of that adjective.
  definition: PropTypes.string,
  //Part of a URL necessary to get an audio file.
  audioKey: PropTypes.string,
  //Whether to show or hide the definition.
  showDefinition: PropTypes.bool,
  //Whether the user has indicated that the adjective is accurate to them.
  accurate: PropTypes.bool,
  //Changes the parent state of this adjective from true to false.
  toggle: PropTypes.func
};
