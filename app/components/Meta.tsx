/// <reference path="../../typings/main.d.ts" />

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import config from '../helmconfig';

const Helmet = require('react-helmet');

class Meta extends React.Component<any, any> {
  render() {
    return (
      <Helmet  
        title="React Webpack Node"
        meta={config.meta}
        link={config.link}
      />
    );
  }
}

ReactDOMServer.renderToString(<Meta />);
let header = Helmet.rewind();

export default header;