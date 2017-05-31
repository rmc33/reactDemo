// @flow

import React, { Component } from 'react';
import * as d3 from "d3";
window.d3 = d3;
import chartStyles from './d3horizontalBarChart.less';
import Popper from 'popper.js';

export default class D3HorizontalBarChart extends Component {

    constructor(props) {
      super(props);
      this.draw = this.draw.bind(this);
      this.resize = this.resize.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
      console.log ('D3HorizontalBarChart receive props', nextProps);
    }
    
   componentDidMount() {
     this.draw();
     d3.select(window).on('resize', this.resize); 
   }
   
   draw() {
   	   let bodyWidth = d3.select('body').node().getBoundingClientRect().width - 20;
	   let domEle = "stacked-bar",
		data = this.props.data,
		margin = {top: 20, right: 20, bottom: 30, left: 60},
		parseDate = d3.timeParse("%m/%Y"),
		width = bodyWidth - margin.left - margin.right,
		height = 250 - margin.top - margin.bottom,
		xScale = d3.scaleLinear().rangeRound([0, width]),
		yScale1 = d3.scaleBand().padding(.3),
		yScale0 = d3.scaleBand().rangeRound([height, 0]),
		color = d3.scaleOrdinal(d3.schemeCategory20),
		xAxis = d3.axisBottom(xScale).tickFormat((d) => { return d; }).tickSizeInner([-height]),
		yAxis =  d3.axisLeft(yScale0),
		svg = d3.select("#"+domEle).append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		yScale0.domain(data.map(function(d) { return d.product; }));
		yScale1.domain(data.map(function(d) { return d.productStatus;})).rangeRound([yScale0.bandwidth(), 0]);

		xScale.domain([0, d3.max(data, (d) => { 
			//return total for each group
			return d.stack1 + d.stack2 + d.stack3;
		}) ]).nice();

		svg.append("g")
		.attr("class", "axis axis-x")
		.attr("transform", "translate(0," + (height+5) + ")")
		.attr('fill', '#ffffff')
		.call(xAxis);

		let layer = svg.selectAll(".layer")
			.data(data)
			.enter().append("g")
			.attr("class", "layer")
			.attr("transform", function(d) { 
			return "translate(0," + yScale0(d.product) + ")"; 
		});

		layer.selectAll("rect")
			.data(function(d) {
				let stack = d3.stack().keys(['stack1','stack2','stack3']).offset(d3.stackOffsetNone);
				return stack([d]);
			})
			.enter()
			.append("rect")
			  .attr("class", "bar-rect")
			  .attr("y", function(d, i) { return yScale1(d[0].data.productStatus); })
			  .attr("x", function(d, i) { return xScale(d[0][0]); })
			  .attr("height", yScale1.bandwidth())
			  .style("fill", function(d, i) { return color(i); })
			  .on('mouseover', function(d) {
				console.log('mouseover d=', d);
				d3.select('#tooltip').remove();
				d3.select(this).style('opacity', '.3');
				let tooltip = d3.select('body').append("div")
					.attr("id", "tooltip")
					.attr("class", "popper")
					.html(`<p class="bold">${d[0].data.product} ${d[0].data.productStatus}</p>
					    ${d.key}:<span class="thin">${d[0].data[d.key]}</span>
					    <div class="popper__arrow" x-arrow></div>`);

				let popper = new Popper(d3.select(this).node(), tooltip.node(), {
			        placement: 'top',
			        modifiers: {
			            flip: {
			                behavior: ['top', 'bottom', 'right', 'left'],
			            },
			            preventOverflow: {
            				boundariesElement: d3.select('#stacked-bar').node(),
        				},
			        }
			    });
			  })
			  .on('mouseout', function(d) {
				d3.select('#tooltip').remove();
				d3.select(this).style('opacity', '1');
			  })
			  .transition()
	    	  .delay(function(d, i) { return i * 50; })
	    	  .attr("width", function(d,i) { return xScale(d[0][1]) - xScale(d[0][0]) })
			

		svg.append("g")
		.attr("class", "axis axis-y")
		.attr("transform", "translate(0,0)")
		.call(yAxis);
   }
   
   resize() {
   	 
   	 //get new height and width
	let bodyWidth = d3.select('body').node().getBoundingClientRect().width - 20;
	   let domEle = "stacked-bar",
		data = this.props.data,
		margin = {top: 20, right: 20, bottom: 30, left: 60},
		width = bodyWidth - margin.left - margin.right,
		height = 250 - margin.top - margin.bottom,
		xScale = d3.scaleLinear().rangeRound([0, width]),
		yScale1 = d3.scaleBand().padding(.3),
		yScale0 = d3.scaleBand().rangeRound([height, 0]),
		xAxis = d3.axisBottom(xScale).tickFormat((d) => { return d; }).tickSizeInner([-height]),
		yAxis =  d3.axisLeft(yScale0);
		
	//update svg and scales
	let svg = d3.select("#"+domEle + " svg")
				.attr("width", (width + margin.left + margin.right))
				.attr("height", (height + margin.top + margin.bottom));
				
	yScale0.domain(data.map(function(d) { return d.product; }));
	yScale1.domain(data.map(function(d) { return d.productStatus;})).rangeRound([yScale0.bandwidth(), 0]);

	xScale.domain([0, d3.max(data, (d) => { 
		return d.stack1 + d.stack2 + d.stack3;
	}) ]).nice();

    //update rects
    svg.selectAll('.bar-rect')
    	.attr("y", function(d, i) { return yScale1(d[0].data.productStatus); })
		.attr("x", function(d, i) { return xScale(d[0][0]); })
		.attr("height", yScale1.bandwidth())
		.attr("width", function(d,i) { return xScale(d[0][1]) - xScale(d[0][0]) })
    
    //update axis
    svg.select('.axis-x')
    	.attr("transform", "translate(0," + (height+5) + ")")
		.attr('fill', '#ffffff')
		.call(xAxis);
	
    svg.select('.axis-y')
    	.attr("transform", "translate(0,0)")
		.call(yAxis);
    
    
   }
   
   
   render() {
     return (<div id="stacked-bar">
     	<div id="tooltip" className="hidden">
	     <p><span id="value"></span>
	     </p>
	   </div></div>);
   }
   
   
}
