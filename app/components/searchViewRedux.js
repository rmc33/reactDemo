import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { doSearchRequest } from '../reducers/actions/searchActions';

//SearchResults functional component
function SearchResults(props) {
	  console.log('SearchResults props', props);
	  if (props.data) {
		  return (
		    <div>
		    	searching for {props.search_value}
		    	<div>
		    	results:
		    	{
		    	  props.data.map(function(result) {
					return <div>{result}</div>
				  })
				}
		    	</div>
		    </div>
		  );
	  }
	  return <div></div>;
}

function mapStateToProps(state) {
  console.log('map state to props', state);
  return {
    search_results: state.search.search_results
  }
}

function mapDispatchToProps(dispatch) {
  return  {
    doSearchRequest: (search_value) => dispatch(doSearchRequest(search_value))	  
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SearchViewRedux extends React.Component {
	
	 constructor(props) {
	    super(props);
	    this.state = {search_value: '', search_results: ''};

	    this.handleChange = this.handleChange.bind(this);
	    this.doSearch = this.doSearch.bind(this);
	 }
	 
	 //life cycle event called after render
	 componentDidMount() {
		 this.refs.search_input.focus();
	 }

	 //life cycle event called when props are changed 
	 //we will receive props from mapped redux store changes
	 componentWillReceiveProps(nextProps) {
		 console.log('receiving props', nextProps);
		 this.setState({search_results: nextProps.search_results});
	 }
	
	 //save changes to search input
	 //search view search_value is now used to get value of search instead of accessing dom
	 handleChange(event) {
	 	 if (event)
		 	this.setState({search_value: event.target.value});
	 }
	 
	 //update search results, this will trigger a dom update for just the search results
	 doSearch(event) {
		 //we have mapped redux action to props
		 this.props.doSearchRequest(this.state.search_value);
	 }
	
	 render() {
	    return (
	      <div>
	      	<label>Search</label>
	      	<input ref="search_input" type="text" id="search_input" onChange={this.handleChange} />
	      	<input type="button" id="search_button" onClick={this.doSearch} value="Search"/>
	      	<SearchResults search_value={this.state.search_value} data={this.state.search_results.data}/>
	      </div>
	    );
	 }
}

/**
function mapStateToProps(state) {
    console.log('map state to props', state);
    return {
        search_results: state.search.search_results
    };
}

function mapDispatchToProps(dispatch) {
  return  {
    doSearchRequest: (search_value) => dispatch(doSearchRequest(search_value))	  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchViewRedux);
**/