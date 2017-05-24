// @flow

import React, { Component } from 'react';
import * as d3 from "d3";
window.d3 = d3;
import chartStyles from './d3horizontalBarChart.less';

const getOffsetTop = (elem) => {
    var offsetTop = 0;
    do {
      if ( !isNaN( elem.offsetTop ) )
      {
          offsetTop += elem.offsetTop;
      }
    } while( elem = elem.offsetParent );
    return offsetTop;
}

export default class D3HorizontalBarChart extends Component {

    constructor(props) {
      super(props);
      this.draw = this.draw.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
      console.log ('D3HorizontalBarChart receive props', nextProps);
    }
    

   componentDidMount() {
     this.draw();
   }
   
   draw() {
   	   let bodyWidth = d3.select('body').node().getBoundingClientRect().width - 20;
	   let domEle = "stacked-bar",
		stackKey = this.props.stackKey,
		data = this.props.data,
		margin = {top: 20, right: 20, bottom: 30, left: 60},
		parseDate = d3.timeParse("%m/%Y"),
		width = bodyWidth - margin.left - margin.right,
		height = 350 - margin.top - margin.bottom,
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
			//console.log('domain d=', d);
			if (d.group1) return d.stack1 + d.stack2 + d.stack3;
			return d.stack4 + d.stack5 + d.stack6; 
		}) ]).nice();

			
			let layer = svg.selectAll(".layer")
				.data(data)
				.enter().append("g")
				.attr("class", "layer")
				.attr("transform", function(d) { console.log("transform, d=", d); return "translate(0," + yScale0(d.product) + ")"; });

			let outTimeout;
			
			layer.selectAll("rect")
				.data(function(d) {
					let stack = d3.stack().keys((item) => {
						//console.log('keys d=', item);
						if (item[0].group1) return ['stack1','stack2','stack3']
						return ['stack4','stack5','stack6'];
					}).offset(d3.stackOffsetNone);
					//console.log('d3 data=', d);
					return stack([d]);
				})
				.enter()
				.append("rect")
				  .attr("y", function(d, i) { return yScale1(d[0].data.productStatus); })
				  .attr("x", function(d, i) { return xScale(d[0][0]); })
				  .attr("height", yScale1.bandwidth())
				  .attr("width", function(d,i) { return xScale(d[0][1]) - xScale(d[0][0]) })
				  .style("fill", function(d, i) { return color(i); })
					  

		
		svg.append("g")
		.attr("class", "axis axis--x")
		.attr("transform", "translate(0," + (height+5) + ")")
		.attr('fill', '#ffffff')
		.call(xAxis);

		svg.append("g")
		.attr("class", "axis axis--y")
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
