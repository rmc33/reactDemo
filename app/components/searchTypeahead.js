import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import jQuery from 'jquery/dist/jquery';
const $ = jQuery;


export default class SearchTypeahead extends React.Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.refs.search_input.focus();
	}

	//save changes to search input
	 //search view search_value is now used to get value of search instead of accessing dom
	 handleChange(event) {
	 	 if (event) {
		 	this.setState({search_value: event.target.value});
		 	this.props.doSearch(event.target.value);
		 }
	 }

	 displayResults() {
	 	if (this.props.data) {
	 		return (
	 			<div>
	    	results:
	    	{
	    	  this.props.data.map((result) => {
				return <div>{result}</div>
			  })
			}
			</div>
	 		);
	 	}
	 	return '';
	 }

	render() {
	  
		  return (
		    <div>
		        <input ref="search_input" type="text" id="search_input" onChange={this.handleChange} />
		    	searching for {this.props.search_value}
		    	{this.displayResults()}
		    </div>
		  );
	}

}