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
		yScale = d3.scaleBand().rangeRound([height, 0]).padding(0.3),
		color = d3.scaleOrdinal(d3.schemeCategory20),
		xAxis = d3.axisBottom(xScale).tickFormat((d) => { return d; }).tickSizeInner([-height]),
		yAxis =  d3.axisLeft(yScale),
		svg = d3.select("#"+domEle).append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		svg.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + (height+5) + ")")
			.attr('fill', '#ffffff')
			.call(xAxis);

		let stack = d3.stack()
			.keys(stackKey)
			/*.order(d3.stackOrder)*/
			.offset(d3.stackOffsetNone);
	
		let layers = stack(data);
			//data.sort(function(a, b) { return b.total - a.total; });
			yScale.domain(data.map(function(d) { return d.product; }));
			
			xScale.domain([0, d3.max(layers[layers.length - 1], function(d) { return d[0] + d[1]; }) ]).nice();

		let layer = svg.selectAll(".layer")
			.data(layers)
			.enter().append("g")
			.attr("class", "layer")
			.style("fill", function(d, i) { return color(i); });

		let outTimeout;
		
		layer.selectAll("rect")
			  .data(function(d) { return d; })
			.enter().append("rect")
			  .attr("y", function(d) { return yScale(d.data.product); })
			  .attr("x", function(d) { return xScale(d[0]); })
			  .attr("height", yScale.bandwidth())
			  .attr("width", function(d) { return xScale(d[1]) - xScale(d[0]) })
			  .on('mousemove', function (d) {
			  		clearInterval(outTimeout);
			  		var offsetTop = getOffsetTop(document.getElementById('stacked-bar'));
			        var xPos = parseFloat(xScale(d.data.stack1 + d.data.stack2 + d.data.stack3));
			        var yPos = parseFloat(d3.select(this).attr('y')) + yScale.bandwidth() / 2;
			        yPos += offsetTop;
			        //var xPos = d3.event.pageX - 5;
              		//var yPos = d3.event.pageY - 70;
			        d3.select('#tooltip')
			            .style('left', xPos + 'px')
			            .style('top', yPos + 'px')
			            .select('#value')
			            .html(`<span class='tipLabel'>Stack 1:</span> ${d.data.stack1}
			            <br/><span class='tipLabel'>Stack 2:</span> ${d.data.stack2}
			            <br/><span class='tipLabel'>Stack 3:</span> ${d.data.stack3}`);

			        d3.select('#tooltip').classed('hidden', false);
			    })
			    .on('mouseout', function () {
			        clearInterval(outTimeout);
			    	outTimeout = setInterval(() => {
						d3.select('#tooltip').classed('hidden', true);			    	
			    	}, 1000);
			    })

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
