import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

export default class SearchView extends React.Component {
	
	 constructor(props) {
	    super(props);
	    this.state = {search_value: '', search_results: ''};

	    this.handleChange = this.handleChange.bind(this);
	    this.doSearch = this.doSearch.bind(this);
	 }
	
	 //save changes to search input
	 //search view search_value is now used to get value of search instead of accessing dom
	 handleChange(event) {
	 	 if (event)
		 	this.setState({search_value: event.target.value});
	 }
	 
	 //update search results, this will trigger a dom update for just the search results
	 doSearch(event) {
		 this.setState({search_results: "searching for " + this.state.search_value});
	 }
	
	 render() {
	    return (
	      <div>
	      	<label>Search</label>
	      	<input type="text" id="search_input" onChange={this.handleChange} />
	      	<input type="button" id="search_button" onClick={this.doSearch} value="Search"/>
	      	<div>{this.state.search_results}</div>
	      </div>
	    );
	 }
	 
}
