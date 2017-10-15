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
  adjective: React.PropTypes.string,
  //The textual description of that adjective.
  definition: React.PropTypes.string,
  //Part of a URL necessary to get an audio file.
  audioKey: React.PropTypes.string,
  //Whether to show or hide the definition.
  showDefinition: React.PropTypes.bool,
  //Whether the user has indicated that the adjective is accurate to them.
  accurate: React.PropTypes.bool,
  //Changes the parent state of this adjective from true to false.
  toggle: React.PropTypes.func
};
