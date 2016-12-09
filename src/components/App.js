import React, { PropTypes } from 'react';
import DevTools from 'mobx-react-devtools';
import Navbar from './Navbar';

const App = ({ children }) => (
  <div className="App">
    <Navbar />
    <div className="App-body">
      {children}
    </div>
    <DevTools />
  </div>
);

App.propTypes = {
  children: PropTypes.element,
};

export default App;
