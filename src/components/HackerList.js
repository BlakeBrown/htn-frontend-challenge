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

	// When the component mounts, fetch hacker list and initiate pagination
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

	// Sets pagination
	handlePageClick = (data) => {
		let selected = data.selected;
		let offset = Math.ceil(selected * this.props.perPage);
		// offset is the index of this.state.hackers[] to display
		let hackersPaginated = [];
		let numHackers = offset + this.props.perPage;
		// Check if it's the last page of pagination, might not be able to display perPage # of hackers
		if(numHackers >= this.state.hackers.length) {
			numHackers = this.state.hackers.length-1;
		}
		for(let i = offset; i < numHackers; i++) {
			hackersPaginated.push(this.state.hackers[i]);
		}
		this.setState({hackersPaginated});
		this.setState({offset});
		this.refs.searchBar.value = '';
	};

	listSkills = function(hacker) {
		return hacker.skills.map((skill,index) =>
				<li key={index} className="hacker-skill">{skill.skill}</li>
			);
	}

	// Called when text is entered in search bar
	// Filters by hacker name & skills
	onChange = function(event) {
		let hackersPaginated = [];
		for(let i = 0; i < this.state.hackers.length; i++) {
			if(~this.state.hackers[i].name.toLowerCase().indexOf(event.target.value.toLowerCase())) {
				hackersPaginated.push(this.state.hackers[i]);
			} else {
				for(let j = 0; j < this.state.hackers[i].skills.length; j++) {
					if(~this.state.hackers[i].skills[j].skill.toLowerCase().indexOf(event.target.value.toLowerCase())) {
						hackersPaginated.push(this.state.hackers[i]);
						break;
					}
				}
			}
			if(hackersPaginated.length == 10) {
				break;
			}
		}
		this.setState({hackersPaginated});
	 }

	// Updates hacker status to "Accepted"
	acceptHacker = function(index, event) {
		for(let i = 0; i < this.state.hackers.length; i++) {
			if(this.state.hackers[i].name == this.state.hackersPaginated[index].name) {
				this.state.hackers[i].status = "Accepted";
				break;
			}
		}
		this.forceUpdate();
	}

	// Updates hacker status to "Rejected"
	rejectHacker = function(index, event) {
		for(let i = 0; i < this.state.hackers.length; i++) {
			if(this.state.hackers[i].name == this.state.hackersPaginated[index].name) {
				this.state.hackers[i].status = "Rejected";
				break;
			}
		}
		this.forceUpdate();
	}

	// Returns accept css classes for hacker
	getAcceptStatus = function(hacker) {
		if(hacker.status == "Accepted") {
			return "hacker-accept hacker-accept-active";
		}
		return "hacker-accept";
	}

	// Returns reject css classes for hacker
	getRejectStatus = function(hacker) {
		if(hacker.status == "Rejected") {
			return "hacker-reject hacker-reject-active";
		}
		return "hacker-reject";
	}

	// Render displays hackers, pagination and search bar
	render() {
		let hackers = this.state.hackersPaginated.map((hacker,index) =>
			<div key={index} className="hacker-wrapper">
				<div className="hacker clearfix">
					<img className="hacker-picture" src={hacker.picture}/>
					<div className="hacker-name">{hacker.name}</div>
					<ul className="hacker-skills"> { this.listSkills(hacker) } </ul>
				</div>
				<div className={this.getAcceptStatus(hacker)} onClick={this.acceptHacker.bind(this, index)}><i class="fa fa-check" aria-hidden="true"></i>Accept</div>
				<div className={this.getRejectStatus(hacker)} onClick={this.rejectHacker.bind(this, index)}><i class="fa fa-times" aria-hidden="true"></i>Reject</div>
				<br />
			</div>
		);

		return (
			<div className="component-wrapper">
				<input className="searchBar" type="text" name="search" placeholder="Search" ref="searchBar" onChange={this.onChange.bind(this)} />
				<div className="hacker-list">
				  	{ hackers }
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
			</div>
		)
	}
}

export default HackerList;
