import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Button, Grid, Row, Col, Clearfix } from 'react-bootstrap';
import jQuery from 'bootstrap-chosen/dist/chosen.jquery-1.4.2/chosen.jquery';
const $ = jQuery;
import chosen from 'bootstrap-chosen/dist/chosen.jquery-1.4.2/chosen.jquery.min';

const searchOptions = [
	{id: '', value: ''}
];

export default class SearchTypeahead extends React.Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.refs.search_input.focus();
		$('#search_input').chosen();
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
	}

	renderSearchOptions() {
		return this.searchOptions.map((option) => {
			return <option id={option.id} value={option.value}/>
		});
	}

	render() {
		return (
		    <div className="typeahead-container">
		        <select ref="search_input" id="search_input" onChange={this.handleChange}>
		        {this.renderSearchOptions()}
		        </select>
		    </div>
		);
	}

}