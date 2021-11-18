import React, { Component } from "react";
import { Alert } from 'antd';


export default class LoginFail extends Component {
  constructor(props) {
    super(props);
  }
  
 onClose = (e) => {
  console.log(e, 'I was closed.');
};

  render() {
    const style = {height: 0}
    return (
      <Alert message="Error Text" type="error" />
    );
  }
}
