import React from 'react'
import ReactDOM from 'react-dom'
import PokeContainer from './PokeContainer'

// var MyPage = React.createClass({
//   render: function () {
//     return (
//     <div className="MyPage">
//       <PokeContainer />
//     </div>
//     )
//   }
// })

ReactDOM.render(
  <div><PokeContainer /></div>,
  document.getElementById('content')
)

// ReactDOM.render(
//   <h1>hello world</h1>,
//   document.getElementById('content')
// )
// console.log('app.js executed!')
