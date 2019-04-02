import { Component } from 'react';

/* BaseComponent implements _bind(), a method to simplify
* binding private methods in components */
class BaseComponent extends Component {
  _bind(...methods) {
    methods.forEach((method) => this[method] = this[method].bind(this));
  }
}

export default BaseComponent;
