import React from 'react';
import axios from 'axios';
import Results from './results.js'
import Activities from './activities.js'
import qs from 'query-string';
import './App.css'


class RunnerForm extends React.Component {
  constructor(props){
    super(props);

    const baseId = qs.parse(window.location.search).id;

    this.state = {
      value: baseId,
      dataSet: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const apiUrl = 'https://6j2cdae137.execute-api.us-east-2.amazonaws.com/prod/'
    const headers = {
     'Accept': 'application/json',
    };

    axios.get(apiUrl+ this.state.value, '' ,headers).then(
      response => {
        this.setState({dataSet: response.data});
      }
    );

    event.preventDefault();
  }

  componentDidMount(){
    if( this.state.value != null ){
    this.handleSubmit(new Event('Submit'));
    }
  }
  
  render() {
    return (
      <div className="App">
        <div className="Form">
          <form onSubmit={this.handleSubmit}>
            <label>
              Runner ID:
              <input type="text" value={this.state.value} onChange={this.handleChange}/>
            </label>  
            <input type="submit" value="Compute"/>
          </form>
        </div>
        <hr className='divider'/ >
        <Results dataSet={this.state.dataSet}/>
        <hr className='divider'/ >
        <Activities dataSet={this.state.dataSet}/>
      </div>
    );
  }
}

export default RunnerForm;
