import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import './HackerList.css';
import axios from 'axios';

class HackerList extends Component {

	constructor(props) {
	  super(props);

	  this.state = {
	    hackers: [],
	    hackersPaginated: [],
	    pageCount: 0,
	    offset: 0
	  };
	}

	componentDidMount() {
		axios.get('https://hackthenorth.com/fe-users.json')
		.then(res => {
			const hackers = res.data;
			const pageCount = Math.ceil(res.data.length/this.props.perPage);
			let hackersPaginated = [];
			for(let i = 0; i < this.props.perPage; i++) {
				hackersPaginated.push(hackers[i]);
			}
			this.setState({hackers});
			this.setState({pageCount});
			this.setState({hackersPaginated});
		});
	}

	handlePageClick = (data) => {
	  let selected = data.selected;
	  let offset = Math.ceil(selected * this.props.perPage);
	  console.log(selected);
	  console.log(offset);
	  let hackersPaginated = [];
	  let numHackers = offset + this.props.perPage;
	  // Check if it's the last page of pagination, might not be able to display perPage # of hackers
	  if(numHackers >= this.state.hackers.length) {
	  	numHackers = this.state.hackers.length-1;
	  }
	  for(let i = offset; i < numHackers; i++) {
	  	hackersPaginated.push(this.state.hackers[i]);
	  }
	  console.log(hackersPaginated);
	  this.setState({hackersPaginated});
	};

	render() {

		let hackers = this.state.hackersPaginated.map((hacker,index) =>
			<li key={index} className="hacker">{hacker.name}</li>
		);

		return (
			<div className="hacker-list">
				<ul>
				  { hackers }
				</ul>
				<ReactPaginate previousLabel={"previous"}
					nextLabel={"next"}
					breakLabel={<a href="">...</a>}
					breakClassName={"break-me"}
					pageCount={this.state.pageCount}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
					onPageChange={this.handlePageClick}
					containerClassName={"pagination"}
					subContainerClassName={"pages pagination"}
					activeClassName={"active"} />
			</div>
		)
	}
}

export default HackerList;
