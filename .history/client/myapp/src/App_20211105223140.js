import React, { Component } from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Route, Routes } from "react-router-dom";
import editFlight from './components/editFlight';
import testView from './components/testView';

// import axios from 'axios';


// function App() {
//   return(
    
//         <div>
//          <label> hi </label>
//          <Routes>
//          <Route path = '/' exact component={editFlight} />
//          <Route path='/admin/editFlight/:id' component={editFlight} />
//          </Routes> 
//         </div>
       
      
//   );
// }
// class App extends Component {
  
//   render() {
//     return (
//       <Router>
//         <div>
//         <Route path = '/' exact component={testView} />
//         <Route path='/admin/editFlight/:id' component={editFlight} />
    
//         </div>
//       </Router>
//     );
//   }
// }
function App() {
  return (
    <Router>
      <div className="container">
      
      <br/>
      <Route path = '/' exact component={testView} />
        <Route path='/admin/editFlight/:id' component={editFlight} />
      
      </div>
    </Router>
  );
}

// export default class App extends Component {
//   render() {
//     return (
//       <div>
//         HELLO WORLD
//       </div>
//     )
//   }
// }




export default App;
