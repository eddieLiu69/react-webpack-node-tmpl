/// <reference path="../../typings/main.d.ts" />

import * as React from 'react';

export default React.createClass({
  render() {
    return (
      <div>
        <h2>{this.props.params.repoName}</h2>
      </div>
    )
  }
})