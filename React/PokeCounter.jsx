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

function updateHP (currentStates) {
  // Deal between 1 - 10 damage
  var resultHP = currentStates.hp - Math.floor((Math.random() * 10) + 1)
  var resultStatus = isFainted(resultHP, currentStates)
  return [resultHP, resultStatus]
}

function isFainted (currentHP, currentStates) {
  console.log('Checking HP if fainted. Evaluating HP: ' + currentHP)
  if (currentHP <= 0) {
    console.log('Pokemon fainted!')
    return 'Fainted'
  }

  return 'Alive'
}

var PokeContainer = React.createClass({
  getInitialState: function () {
    return {
      numMonsters: 0,
    }
  },

  componentWillUpdate: function (nextProps, nextState) {
    console.log('Change in numMonsters: ' + this.state.numMonsters + ' -> ' + nextState.numMonsters)
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

  onDeleteMonster: function (event) {
    console.log('Changing numMonsters. Current numMonsters: ' + this.state.numMonsters)
    this.setState({
      numMonsters: this.state.numMonsters - 1,
    })
    console.log('After changing, current numMonsters: ' + this.state.numMonsters)
  },

  render: function () {
    var monsters = []
    for (var i = 0; i < this.state.numMonsters; i++) {
      monsters.push(<PokeCounter className='PokeCounter' onClick={this.onDeleteMonster} key={i} />)
    }
    return (
    <div className='PokeContainer'>
      <h3>PokeContainer numMonsters: {monsters.length}</h3>
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
      isRemoved: false,
      numClicks: 0,
      // Give between 50 - 100 HP
      hp: Math.floor(((Math.random() * 10) * 5) + 50),
      fainted: 'Alive',
    }
  },

  // Runs after it is decided that update is allowed (shouldComponentUpdate returns true)
  componentWillUpdate: function (nextProps, nextState) {
    // Report numClicks if changed
    if (this.state.numClicks != nextState.numClicks) {
      console.log('numClicks changed: ' + this.state.numClicks + ' -> ' + nextState.numClicks)
    }
    // Report hp if changed
    if (this.state.hp != nextState.hp) {
      console.log('hp changed: ' + this.state.hp + ' -> ' + nextState.hp)
    }
  },

  componentWillUnmount: function () {
    this.props.onClick()
  },

  // Runs after render
  // componentDidUpdate: function (prevProps, prevState) {
  //       this.props.fainted === "Fainted" ? this.props.onClick() : null
  // },

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
    var resultHP, resultStatus
      ;[resultHP, resultStatus] = updateHP(this.state)
    // Update HP and check if fainted
    this.setState({
      hp: resultHP,
      fainted: resultStatus,
    // fainted: isFainted(this.state.hp) evaluates before HP changes for some reason, late faint
    })
  },

  onDelete: function (event) {
    this.setState({
      isRemoved: true,
    })
  },

  render: function () {
    var pic = levelChecker(this.state.numClicks)
    var picName = getPictureName(pic)
    // Remove Pokemon from view if Fainted
    if (this.state.fainted === 'Alive' || this.state.isRemoved) {
      return (
      <div className='PokeCounter'>
        <h3>Info:</h3>
        <p>
          Name:
          {picName}
        </p>
        <p>
          ID:
          {this.key}
        </p>
        <p>
          EXP (Clicks):
          {this.state.numClicks}
        </p>
        <p>
          HP:
          {this.state.hp} (
          {this.state.fainted})
        </p>
        <button onClick={this.onPokeClick}>
          Train
        </button>
        <button onClick={this.onDelete}>
          Delete Monster
        </button>
        <img src={pic} onClick={this.onPokeClick} />
      </div>
      )
    } else {
      return null
    }
  }
})

ReactDOM.render(
  <PokeContainer />,
  document.getElementById('content')
)
