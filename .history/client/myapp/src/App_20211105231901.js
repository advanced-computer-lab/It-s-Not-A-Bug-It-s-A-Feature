import React, { Component } from 'react';
import { Routes } from 'react-router';
import { render } from "react-dom";
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Route, Routes } from "react-router-dom";
import EditFlight from './components/EditFlight';
import testView from './components/TestView';

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
      <Router>
        <div>
        <Route exact path='/' component={testView} />
        <Route path='/admin/editFlight/:id' component={EditFlight} />    
        </div>
      </Router>
    );
  }
}

export default App;
