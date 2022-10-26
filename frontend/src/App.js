import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      users: []
    }
  }

  getUsers = async () => {
    var response = await fetch(
      'http://localhost:5000/api/users',
      {
        method: 'get'
      }
    )
    var responseJson = await response.json();
    this.setState({
      users: responseJson
    })
  }


  render() {
    const users = this.state.users.map((item, index) => <li key={index}>{item.name}</li>)
    return (
      <div className="App">
        <button onClick={this.getUsers}>Hello</button>
        <button onClick={this.getUsers}>Chao ngocthanhd</button>
        <ul>{users}</ul>
      </div>
    );
  }
}

export default App;
