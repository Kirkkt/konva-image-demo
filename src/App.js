import React from 'react';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';

import Home from './Home';
import StressTest from './StressTest';
import Editor from './Editor';
import './App.css';

const Nav = styled.nav`
  margin: 10px;
`

const NavLink = styled(Link)`
  margin: 10px;
  background: yellow;
`

const App = () => (
  <div className="App">
    <Nav>
      <NavLink className="navItem" to="/">Home</NavLink>
      <NavLink className="navItem" to="/stressTest">Konva image stress test</NavLink>
      <NavLink className="navItem" to="/editor">Single stage editor</NavLink>
    </Nav>
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/stressTest" component={StressTest}/>
      <Route exact path="/editor" component={Editor}/>
    </div>
  </div>
);

export default App;
