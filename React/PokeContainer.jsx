const EVOLUTION_ONE_MIN_HP = 50
const EVOLUTION_ONE_MAX_HP = 100
const DAMAGE_MIN = 1
const DAMAGE_MAX = 10
const LEVEL_ONE = 5
const LEVEL_TWO = 10
const LEVEL_THREE = 15
const MAX_LEVEL = 20

function modifyArrayItemAtIndex (array, activeArraryIdx, item) {
	console.log("~ modifyArrayItemAtIndex called ~")
	var arrayCopy = array.splice(0)
	arrayCopy[activeArraryIdx] = item
	return arrayCopy
}

function generateRandomHitpoints(minHitpoints, maxHitpoints) {
	return Math.floor((Math.random() * (maxHitpoints - minHitpoints)) + minHitpoints)
}

function changeValueOfKeyValuePair(keyValuePair, attributeName, replacementItem) {
	console.log("~ changeValueOfKeyValuePair called ~")
	switch(attributeName) {
		case 'active':
			keyValuePair.active = replacementItem
			break;
		case 'containerArrayIdx': 
			keyValuePair.containerArrayIdx = replacementItem
			break;
		case 'evolutionNum': 
			keyValuePair.evolutionNum = replacementItem
			break;
		case 'experiencePoints': 
			keyValuePair.experiencePoints = replacementItem
			break;
		case 'hitpoints': 
			keyValuePair.hitpoints = replacementItem
			break;
		case 'imagePath':
			keyValuePair.imagePath = replacementItem
			break;
		case 'pokemonName':
			keyValuePair = replacementItem
			break;
	}
}

function generatePokeStatusStruct(activeSlotIdx, minHitpointsSetting, maxHitpointsSetting) {
	console.log("~ generatePokeStatusStruct called ~")
	// Set ImagePath
	// Set name
	var name = 'Pictures/pokeball.png'
	var pokemonImagePath = 'Pictures/pokeball.png'
	// Generate HP between 50-100
	var generatedHitpoints = generateRandomHitpoints(minHitpointsSetting, maxHitpointsSetting)
	
	return {active: false, containerArrayIdx: activeSlotIdx, evolutionNum: 0, experiencePoints: 0, 
		hitpoints: generatedHitpoints, imagePath: pokemonImagePath, pokemonName: name}
}

function trainPokemon(pokeStatus) {
	console.log("~ trainPokemon called ~")
	console.log('Recieved Pokemon name: ' + pokeStatus.pokemonName + ' containerIdx: ' + pokeStatus.containerArrayIdx)
	var damage = generateRandomHitpoints(DAMAGE_MIN, DAMAGE_MAX)
	changeValueOfKeyValuePair(pokeStatus, 'hitpoints', pokeStatus.hitpoints - damage) // update hitpoints
	changeValueOfKeyValuePair(pokeStatus, 'experiencePoints', pokeStatus.experiencePoints + 1) //Update experiencePoints
}

function isFainted(pokeStatus) {
	console.log("~ isFainted called ~")
	if (pokeStatus.hitpoints <= 0) {
		return true
		 // changeValueOfKeyValuePair(pokeStatus, 'active', false)
	}
	return false
}

function changeImagePathBasedOnExperiencePionts (pokeStatus) {
  var currentExperiencePoints = pokeStatus.experiencePoints
  var pic
  if (currentExperiencePoints >= MAX_LEVEL) {
    // X evolve Charizard
    pic = 'Pictures/charizard-max.png'
  } else if (currentExperiencePoints >= LEVEL_THREE) {
    // Charizard
    pic = 'Pictures/charizard.png'
  } else if (currentExperiencePoints >= LEVEL_TWO) {
    // Charmeleon
    pic = 'Pictures/charmeleon.png'
  } else {
    // Charmander
    pic = 'Pictures/charmander.png'
  }

  changeValueOfKeyValuePair(pokeStatus, 'imagePath', pic)

}

var PokeContainer = React.createClass({
	getInitialState: function () {
		return {
			activeSlots: [null, null, null, null, null, null],
			// ~ Testing only ~
			// activeSlots: [1, 2, 3, 4, 5, 6],
		}
	},

	componentDidUpdate: function (nextProps, nextState) {
		console.log('Slot status: ' + this.state.activeSlots + ' Slot length ' + this.state.activeSlots.length)
	},

	componentDidMount: function () {
  		console.log('Slot status: ' + this.state.activeSlots + ' Slot length ' + this.state.activeSlots.length)
	},

	/*
	* Saves pokeStatus struct in this.state.activeSlots at index idx.
	**/
	onActivateSlot: function (containerIdx, event) {
		console.log("~ onActivateSlot called ~")

		console.log("Before Activation current array: " + this.state.activeSlots)
		console.log('OnActivateSlot event: ' + event)
		console.log('OnActivateSlot containerIdx: ' + containerIdx)
		// Generate Pokemon
		var generatedPokemon = generatePokeStatusStruct(containerIdx, EVOLUTION_ONE_MIN_HP, EVOLUTION_ONE_MAX_HP);
		console.log("Generated: " + generatedPokemon.pokemonName)
		// Change to active
		changeValueOfKeyValuePair(generatedPokemon, 'active', true)
		console.log(':active: of generated Pokemon: ' + generatedPokemon.active)
		// Add Pokemon to array
		var modifiedArray = modifyArrayItemAtIndex(this.state.activeSlots, containerIdx, generatedPokemon)
		console.log(modifiedArray)
		this.setState({
			activeSlots: this.state.activeSlots = modifiedArray
		})
		console.log("After Activation current array: " + this.state.activeSlots)
	},

	onDeactivateSlot: function (containerIdx, event) {
		var modifiedArray = modifyArrayItemAtIndex(this.state.activeSlots, containerIdx, null)
		this.setState({
			activeSlots: modifiedArray
		})
	},

	onUpdatePokemonStatus: function(containerIdx, event) {
		console.log("~ onUpdatePokemonStatus called ~")
		console.log('OnActivateSlot event: ' + event)
		console.log('OnActivateSlot containerIdx: ' + containerIdx)

		var modifiedPokemonStatusInfo = this.state.activeSlots[containerIdx]
		console.log('modifiedPokemonStatusInfo recieved: ' + this.state.activeSlots[containerIdx])
		// console.log('Before update Pokemon Status: ' + modifiedPokemonStatusInfo)
		// Decrease HP + Increment experiencePoints
		trainPokemon(modifiedPokemonStatusInfo)
		// if HP <= 0, deactivate (set that index back to null)
		if (isFainted(modifiedPokemonStatusInfo)) {
			var modifiedActiveSlots = modifyArrayItemAtIndex (this.state.activeSlots, containerIdx, null)
		} else {
			changeImagePathBasedOnExperiencePionts(modifiedPokemonStatusInfo)
			var modifiedActiveSlots = modifyArrayItemAtIndex(this.state.activeSlots, 
			containerIdx, modifiedPokemonStatusInfo)
		}

		this.setState({
			activeSlots: modifiedActiveSlots
		})
	},

	render: function() {
		var pokeSlots = []
		for (var i = 0; i < this.state.activeSlots.length; i++) {
			console.log('Checking activeSlots i = ' + i)
			if (this.state.activeSlots[i] != null) {
				console.log(this.state.activeSlots[i])
				var generatedPokemon = this.state.activeSlots[i]
				pokeSlots.push(<PokeSlot key={i} train={this.onUpdatePokemonStatus} deactivate={this.onDeactivateSlot} 
					active={generatedPokemon.active} containerArrayIdx={generatedPokemon.containerArrayIdx}
					evolutionNum={generatedPokemon.evolutionNum} experiencePoints={generatedPokemon.experiencePoints}
					hitpoints={generatedPokemon.hitpoints} imagePath={generatedPokemon.imagePath}
					pokemonName={generatedPokemon.pokemonName} />)
			} else {
				pokeSlots.push(<PokeSlot key={i} active={false} activate={this.onActivateSlot} containerArrayIdx={i} />)
			} 
		} 
		return (
			<div className="PokeContainer">
				<h2>Your roster:</h2>
				{pokeSlots}
			</div>
			)
	}
})

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

// ~ Testing only ~
ReactDOM.render(
  <PokeContainer />,
  document.getElementById('content')
)