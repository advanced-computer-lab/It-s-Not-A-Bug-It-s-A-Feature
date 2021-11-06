import React, { Component } from 'react';
// import { Routes } from 'react-router';
import { render } from "react-dom";
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Route, Routes } from "react-router-dom";
import EditFlight from './components/EditFlight';
import TestView from './components/TestView';

// function App() {
//   return (
//     <Router>
//       {/* <Routes> */}
//       <div>
//         <Route path='/admin/editFlight/:id' component={EditFlight} />
//         <label>hiii</label>
//       </div>
//       {/* </Routes> */}
//       <div>hi 22</div>
//     </Router>
//   );
// }
class App extends Component {
  
  render() {
    return (
      //  <Router>
        <div>
          <Routes>
        <Route exact path='/' component={TestView} />
        <Route path='/admin/editFlight/:id' component={EditFlight} />
        <Route path='/admin/allFlights' component={TestView} />    
        </Routes>
        </div>
      //  </Router>
    );
  }
}

export default App;
