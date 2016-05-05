var PokeSlot = React.createClass({
	componentWillMount: function () {
	      
	},
	render: function() {
		if (this.props.active) {
			return (
				<div className="PokeSlot">
					<h3>{this.props.pokemonName}</h3>
					<p>HP: {this.props.hitpoints} EXP: {this.props.experiencePoints}</p>
					<img src={this.props.imagePath} onClick={this.props.train.bind(null, this.props.containerArrayIdx)} />
					<button onClick={this.props.deactivate.bind(null, this.props.containerArrayIdx)}>Release Pokemon</button>
				</div>
			)
		} else {
			var thisComponentIndex = this.props.containerArrayIdx
			return (
				<div className="PokeSlot">
					<h3>Slot: {this.props.containerArrayIdx}</h3>
					<button onClick={this.props.activate.bind(null, this.props.containerArrayIdx)}>Get Pokemon</button>
				</div>
			)
		}
		
	}
})