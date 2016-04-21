/// <reference path="../../typings/main.d.ts" />

import * as React from 'react';
import Home from './Home'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>Menus</h1>
        <ul role="nav">
          <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/repos">Repos</NavLink></li>
          <li><NavLink to="/comments">Comments</NavLink></li>
          <li><NavLink to="/products">Products</NavLink></li>
          <li><NavLink to="/todos">Todos</NavLink></li>
        </ul>

        {this.props.children}
      </div>
    )
  }
})