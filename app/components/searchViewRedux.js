import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { doSearchRequest } from '../reducers/actions/searchActions';
import CubeModule from './Cube';
import jQuery from 'jquery';
import sliderSass from './slider.less';
import SearchTypeahead from './searchTypeahead';
import D3Chart from './d3horizontalBarChart';
const $ = jQuery;


class SearchViewRedux extends React.Component {
	
	 constructor(props) {
	    super(props);
	    this.state = {search_value: '', search_results: ''};
	 }
	 
	 //life cycle event called after render
	 componentDidMount() {
		 
		 console.log('element = ', document.getElementsByClassName('cube')[0]);
		 let viewport = new CubeModule.Viewport({
		  	element: document.getElementsByClassName('cube')[0],
		  	fps: 20,
		  	sensivity: .4,
		  	sensivityFade: .93,
		  	speed: 5,
		  	touchSensivity: 1.5
		  });
		 let cube = new CubeModule.Cube({
		  viewport: viewport,
		  element: document.getElementsByClassName('cube')[0]
		});

		 let carousel = $('.carousel');
		 let seats = $('.carousel-seat');

		 const next = (el) => { return (el.next().length > 0) ? el.next() : seats.first(); }

		 const prev = (el) => { return (el.prev().length > 0) ? el.prev() : seats.last(); }

		$('.toggle').on('click', function(e) {
		  let el = $('.is-ref').removeClass('is-ref');
		  let new_seat;

		  if ($(e.currentTarget).data('toggle') == 'next') {
			new_seat = next(el);
		    carousel.removeClass('is-reversing');
		  }
		  else {
		  	new_seat = prev(el);
		    carousel.addClass('is-reversing');
		  }
		  
		  new_seat.addClass('is-ref').css('order', 1);
		  console.log("new_seat=", new_seat.text(), new_seat.css('order'));
		  $.each(seats, ( index, value ) => {
		  	    if (index > 0) {
		  	    	new_seat = next(new_seat).css('order', index+1);
		  			console.log(index + "-new_seat=", new_seat.text(), new_seat.css('order'));
		  	    }
		  });
		    
		  carousel.removeClass('is-set');
		  setTimeout (()=>{carousel.addClass('is-set');}, 50);
		});
	 }

	 //life cycle event called when props are changed 
	 //we will receive props from mapped redux store changes
	 componentWillReceiveProps(nextProps) {
		 console.log('receiving props', nextProps);
		 this.setState({search_results: nextProps.search_results});
	 }
	 
	
	 render() {
	    var data = [{product:"Product 1", stack1:20, stack2: 20, stack3: 60},
	    			{product:"Product 2", stack1:2, stack2: 10, stack3: 50},
	    			{product:"Product 3", stack1:0, stack2: 0, stack3: 10},
	    			{product:"Product 4", stack1:4, stack2: 0, stack3: 10},
	    			{product:"Product 5", stack1:40, stack2: 5, stack3: 100}];
	    			
		var key = ["stack1", "stack2", "stack3"];

	    return (
	      <div>
	      	<SearchTypeahead doSearch={this.props.doSearchRequest} data={this.state.search_results.data}/>
	      	<div id="wrapper">
			  <div className="viewport">
			    <div className="cube">
			      <div className="side">
			        <div className="cube-image">1</div>
			      </div>
			      <div className="side">
			        <div className="cube-image">2</div>
			      </div>
			      <div className="side">
			        <div className="cube-image">3</div>
			      </div>
			      <div className="side">
			        <div className="cube-image">4</div>
			      </div>
			      <div className="side">
			        <div className="cube-image">5</div>
			      </div>
			      <div className="side">
			        <div className="cube-image active">6</div>
			      </div>
			    </div>
			  </div>
			</div>
			<D3Chart data={data} stackKey={key}/>
	      </div>
	    );
	 }
}

function mapStateToProps(state) {
  console.log('map state to props...', state);
  let search_results = state.search_results;

  return {
    search_results
  }
}

function mapDispatchToProps(dispatch) {
  return  {
    doSearchRequest: (search_value) => dispatch(doSearchRequest(search_value))	  
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchViewRedux);