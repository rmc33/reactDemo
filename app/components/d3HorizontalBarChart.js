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
    }
    
    componentWillReceiveProps(nextProps) {
      console.log ('D3HorizontalBarChart receive props', nextProps);
    }
    

   componentDidMount() {

   	   var bodyWidth = d3.select('.metricsBody').node().getBoundingClientRect().width;
	   var me = this,
		domEle = "stacked-bar",
		stackKey = this.props.stackKey,
		data = this.props.data,
		margin = {top: 20, right: 20, bottom: 30, left: 50},
		parseDate = d3.timeParse("%m/%Y"),
		width = bodyWidth - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom,
		xScale = d3.scaleLinear().rangeRound([0, width]),
		yScale = d3.scaleBand().rangeRound([height, 0]).padding(0.1),
		color = d3.scaleOrdinal(d3.schemeCategory20),
		xAxis = d3.axisBottom(xScale).tickFormat((d) => { return d; }).tickSizeInner([-height]),
		yAxis =  d3.axisLeft(yScale).tickFormat(d3.timeFormat("%b")),
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

		var stack = d3.stack()
			.keys(stackKey)
			/*.order(d3.stackOrder)*/
			.offset(d3.stackOffsetNone);
	
		var layers = stack(data);
			data.sort(function(a, b) { return b.total - a.total; });
			yScale.domain(data.map(function(d) { return parseDate(d.date); }));
			xScale.domain([0, d3.max(layers[layers.length - 1], function(d) { return d[0] + d[1]; }) ]).nice();

		var layer = svg.selectAll(".layer")
			.data(layers)
			.enter().append("g")
			.attr("class", "layer")
			.style("fill", function(d, i) { return color(i); });

		  layer.selectAll("rect")
			  .data(function(d) { return d; })
			.enter().append("rect")
			  .attr("y", function(d) { return yScale(parseDate(d.data.date)); })
			  .attr("x", function(d) { return xScale(d[0]); })
			  .attr("height", yScale.bandwidth())
			  .attr("width", function(d) { return xScale(d[1]) - xScale(d[0]) })
			  .on('mouseover', function (d) {
			  		var offsetTop = getOffsetTop(document.getElementById('stacked-bar'));
			  	    console.log('d3 d=', d.data.total, xScale(d.data.total));
			        var xPos = parseFloat(xScale(d.data.wounds + d.data.other + d.data.disease));
			        var yPos = parseFloat(d3.select(this).attr('y')) + yScale.bandwidth() / 2;
			        yPos += offsetTop;
			        //var xPos = d3.event.pageX - 5;

              		//var yPos = d3.event.pageY - 70;
			        d3.select('#tooltip')
			            .style('left', xPos + 'px')
			            .style('top', yPos + 'px')
			            .select('#value')
			            .html((d.data.confirmed) + "<br/>" + (d.data.nonConfirmed) + "<br/>" + (d.data.partialConfirmed));

			        d3.select('#tooltip').classed('hidden', false);
			    })
			    .on('mouseout', function () {
			        d3.select('#tooltip').classed('hidden', true);
			    })

			svg.append("g")
			.attr("class", "axis axis--y")
			.attr("transform", "translate(0,0)")
			.call(yAxis);							
   }
   
   render() {
     return (<div id="stacked-bar">
     	<div id="tooltip" class="hidden">
	     <p><span id="value">100</span>
	     </p>
	   </div></div>);
   }
   
   
}
