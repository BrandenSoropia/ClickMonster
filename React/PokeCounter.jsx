const STRING_OFFSET = 9
const LEVEL_ONE = 5
const LEVEL_TWO = 10
const LEVEL_THREE = 15
const RESET_THRESHOLD = 20

// Return path to image based on ranges
function levelChecker (clicks) {
  var pic
  if (clicks >= RESET_THRESHOLD) {
    // X evolve Charizard
    pic = 'Pictures/charizard-max.png'
  } else if (clicks >= LEVEL_THREE) {
    // Charizard
    pic = 'Pictures/charizard.png'
  } else if (clicks >= LEVEL_TWO) {
    // Charmeleon
    pic = 'Pictures/charmeleon.png'
  } else if (clicks >= LEVEL_ONE) {
    // Charmander
    pic = 'Pictures/charmander.png'
  } else {
    // Pokeball
    pic = 'Pictures/pokeball.png'
  }

  return pic
}

function getPictureName (path) {
	console.log(path.length)
  // Removes 'Pictures/' from path to get name
  return path.substr(STRING_OFFSET, (path.length - 4))
}

var PokeContainer = React.createClass({
  getInitialState: function () {
    return {
      numMonsters: 0,
    }
  },

  onGetMonster: function (event) {
    // Reset after more than 6 spawns
    if (this.state.numMonsters === 6) {
      this.setState({
        numMonsters: 0,
      })
    } else {
      this.setState({
        numMonsters: this.state.numMonsters + 1,
      })
    }
  },

  render: function () {
    var monsters = []
    for (var i = 0; i < this.state.numMonsters; i++) {
      monsters.push(<PokeCounter className='monsters' key={i} />)
    }
    return (
    <div>
      <h3>Poke-Container numMonsters: {monsters.length}</h3>
      {monsters}
      <button onClick={this.onGetMonster}>
        Get Monster
      </button>
    </div>
    )
  }
})

var PokeCounter = React.createClass({
  getInitialState: function () {
    return {
      numClicks: 0,
      hp: 10,
    }
  },

  onPokeClick: function (event) {
    if (this.state.numClicks === 24) {
      this.setState({
        numClicks: 0
      })
    } else {
      this.setState({
        numClicks: this.state.numClicks + 1
      })
    }
  },

  render: function () {
    var pic = levelChecker(this.state.numClicks)
    var picName = getPictureName(pic)
    return (
    <div>
      <h3>Info:</h3>
      <p>Name: {picName}</p>
      <p>EXP (Clicks): {this.state.numClicks}</p>
      <p>HP: {this.state.hp}</p>
      <button onClick={this.onPokeClick}>
        Press
      </button>
      <img src={pic} onClick={this.onPokeClick} />
    </div>
    )
  }
})

ReactDOM.render(
  <PokeContainer />,
  document.getElementById('content')
)
