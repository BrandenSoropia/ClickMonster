function levelChecker(clicks) {
	var pic;
	if (clicks >= 20) {
		// X evolve Charizard
		pic = "Pictures/charizard-max.png";
	} else if (clicks >= 15) {
	  // Charizard
	  // pic = "http://cdn.bulbagarden.net/upload/thumb/7/7e/006Charizard.png/250px-006Charizard.png";
	  pic = "Pictures/charizard.png";
	} else if (clicks >= 10) {
	  // Charmeleon
	  // pic = "http://cdn.bulbagarden.net/upload/thumb/4/4a/005Charmeleon.png/250px-005Charmeleon.png";
	  pic = "Pictures/charmeleon.png";
	} else if (clicks >= 5) {
	  // Charmander
	  // pic = "http://orig13.deviantart.net/d44b/f/2011/120/8/6/pokemon___charmander_by_lilnutta10-d2vr4ov.jpg";
	  pic = "Pictures/charmander.png";
	} else {
	  // Pokeball
	  // pic = "http://vignette2.wikia.nocookie.net/toonmage/images/b/b7/Poke'ball.png/revision/latest?cb=20110306114739";
	  pic = "Pictures/pokeball.png";
	}

	return pic;
};

var PokeCounter = React.createClass({
	getInitialState: function() {
	  return {
	    numClicks: 0,
	  };
	},

	onPokeClick: function(event) {
	  this.setState({
	    numClicks: this.state.numClicks + 1,
	  });
	},

	render: function() {
	  var pic = levelChecker(this.state.numClicks);
	  return (
	    <div>
	      <div>Clicks: {this.state.numClicks}</div>
	      <button onClick={this.onPokeClick}>Press</button>
	      <img src={pic} onClick={this.onPokeClick} />
	    </div>
	  );
	}
});

ReactDOM.render(
	<PokeCounter />,
	document.getElementById('content')
);