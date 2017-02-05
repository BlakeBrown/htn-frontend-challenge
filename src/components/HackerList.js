import React, { Component } from 'react';
import './HackerList.css';
import axios from 'axios';

class HackerList extends Component {

	constructor(props) {
	  super(props);

	  this.state = {
	    hackers: []
	  };
	}

	componentDidMount() {
		axios.get('https://hackthenorth.com/fe-users.json')
		.then(res => {
			console.log(res);
			const hackers = res.data;
			this.setState({hackers});
			// let hackers = res.data;
			// hackers.forEach(e => {
			// 	console.log(e);
			// });
		  // const hackers = res.data.data.children.map(obj => obj.data);
		  // this.setState({ hackers });
		});
	}

	render() {
		return (
			<div>
				<ul>
					<li className="hacker">Hacker 1</li>
					<li className="hacker">Hacker 1</li>
					<li className="hacker">Hacker 1</li>
					<li className="hacker">Hacker 1</li>
					<li className="hacker">Hacker 1</li>
				</ul>
				<ul>
				  {this.state.hackers.map(hacker =>
				    <li>{hacker.name}</li>
				  )}
				</ul>
			</div>
		)
	}
}

export default HackerList;
