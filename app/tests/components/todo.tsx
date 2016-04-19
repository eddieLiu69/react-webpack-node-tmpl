/// <reference path="../../../typings/main.d.ts" />

import * as React from 'react';
import App from '../../components/App';

const expect = require('expect');
const TestUtils = require('react/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.

describe('app', function () {
  it('renders without problems', function () {

    var root = TestUtils.renderIntoDocument(<App/>);
    expect(root).toExist();
  });
});

