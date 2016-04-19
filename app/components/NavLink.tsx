/// <reference path="../../typings/main.d.ts" />

import * as React from 'react';
import { Link } from 'react-router'

export default React.createClass<ReactRouter.LinkProps, any>({
  render() {
    return <Link {...this.props} activeClassName="active"/>
  }
})