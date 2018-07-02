import React, { Component } from 'react';
import logo from './logo.svg';
import './bower_components/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records : null,
      fetched : false
    };
  }

  componentWillMount(){
    if(!this.state.fetched){
          this.setState({fetched : true})
          setTimeout(()=> {
          axios.get('http://localhost:8080/person')
        .then(function (response) {
          // handle success
          this.setState({records : response.data.data})
          console.log(response);
        }.bind(this))
        .catch(function (error) {
          // handle error
          console.log(error);
        })
      }, 500)
    }
  }

  renderList() {
    if(this.state.records) {
        return this.state.records.map( i => {
          return(
              <tr key = {i}>

                <td><dd> {i.first_name}  </dd></td>
                <td><dd> {i.last_name} </dd></td>
                <td> <dd>{i.contact_number}</dd></td>

              </tr>
            )
        })

    }else{
      return (<tr><span>No Records </span></tr>);
    }
  }
  render() {

      return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

          Showing Persons Table
          <div className="container">
            <h2>Person Data Records</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Contact Number</th>
                </tr>
              </thead>
              <tbody>
              {this.renderList()}
              </tbody>
            </table>
          </div>
                    
      </div>
    );
    

  }
}

export default App;
