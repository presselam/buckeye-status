import React from 'react';
import axios from 'axios';

class RunnerForm extends React.Component {
  constructor(props){
    super(props);
//    this.state = {value: ''};
    this.state = {value: '28538797'};

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
        alert(response.data);
      }
    );

    event.preventDefault();
  }

  render() {
    return (
      <div className="Form">
      <form onSubmit={this.handleSubmit}>
        <label>
          Runner ID:
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
        </label>  
        <input type="submit" value="Compute"/>
      </form>
      </div>
    );
  }
}

export default RunnerForm;
