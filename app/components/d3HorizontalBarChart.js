import React, { Component } from 'react';
import * as d3 from "d3";
window.d3 = d3;//added for debugging
import chartStyles from './d3horizontalBarChart.less';
//import Popper from 'popper.js';
import jQuery from 'jquery';
const $ = jQuery;

const styles = {
    chartTitle: {
        'border-bottom': '2px solid #E6E9ED',
        'padding': '1px 5px 5px',
        'margin-bottom': '10px'
    },
    chartContainer: {
        position: 'relative',
        'margin': '10px',
        'padding': '10px',
        'background': '#fff',
        'border': '1px solid #E6E9ED',
        'opacity': 1,
        'transition': 'all .2s ease',
        'text-align': 'center'
    }
};

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
		propsColors = this.props.colors,
		margin = {top: 20, right: 10, bottom: 30, left: 60},
		width = bodyWidth - margin.left - 40,
		height = 250 - margin.top - margin.bottom,
		xScale = d3.scaleLinear().rangeRound([0, width]),
		yScale1 = d3.scaleBand().padding(.2),
		yScale0 = d3.scaleBand().rangeRound([height, 0]).padding(.2),
		color = d3.scaleOrdinal(d3.schemeCategory20),
		xAxis = d3.axisBottom(xScale).tickFormat((d) => { return d; }).tickSizeInner([-height]),
		yAxis =  d3.axisLeft(yScale0),
		svg = d3.select("#"+domEle).append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		svg.append('defs')
			.html(`<filter id="glow">
				    <feGaussianBlur stdDeviation="6.5" result="coloredBlur"/>
				    <feMerge>
				        <feMergeNode in="coloredBlur"/>
				        <feMergeNode in="SourceGraphic"/>
				    </feMerge></filter>`);
		
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
		.attr("font-size","12px")
		.call(xAxis);

		let layer = svg.selectAll(".layer")
			.data(data)
			.enter().append("g")
			.attr("class", "layer")
			.attr("transform", function(d) { 
			return "translate(0," + yScale0(d.product) + ")"; 
		});
		let lastX = 0;
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
			  .style("fill", function(d, i) { return propsColors[d.key];/*color(i);*/ })
			  //.style("stroke","black")
			  .on('click', function(d, i) {
				console.log('mouseover d=', d);
				//if (lastHoveredIndex == i) return;
				let yPos = $(this).offset().top +  yScale1.bandwidth();
				let clickedX = d3.event.pageX;
				if (!lastX) lastX = clickedX;
				d3.select('#tooltip').remove();
				$('.bar-rect').removeClass('active');
				d3.select(this).attr('class', 'bar-rect active');
				let tooltip = d3.select('body').append("div")
					.attr("id", "tooltip")
					.attr("class", "popper")
					.attr("x-placement", "bottom")
					.html(`<p class="bold">${d[0].data.product} ${d[0].data.productStatus}</p>
					    ${d.key}:<span class="thin">${d[0].data[d.key]}</span>
					    <div class="popper__arrow_outline"></div><div class="popper__arrow"></div>`)
					.style("top", yPos)
				 let width = $(tooltip.node()).width() / 2;
				 console.log(`width=${width},clickedX=${clickedX}`);
				 $(tooltip.node()).css('left', (clickedX - width - 10)+'px')
				 	.addClass('shown')
				 	.find('.popper__arrow')
				 	.css({
               	 		left: (width) + 'px' 
               	 	});
               	 lastX = clickedX - width - 10;
			  })
			  .on('mouseover', function(d,i) {
				//d3.select(this).style('stroke', color(i));
			  })
			  .on('mouseout', function(d) {
				//d3.select(this).style('stroke', 'white');
			  })
			  .transition()
	    	  .delay(function(d, i) { return i * 80; })
	    	  .attr("width", function(d,i) { return xScale(d[0][1]) - xScale(d[0][0]) })
			

		svg.append("g")
		.attr("class", "axis axis-y")
		.attr("transform", "translate(0,0)")
		.attr("font-size","12px")
		.call(yAxis);
   }
   
   resize() {
   	 
   	//get new height and width
	let bodyWidth = d3.select('body').node().getBoundingClientRect().width - 20;
	   let domEle = "stacked-bar",
		data = this.props.data,
		margin = {top: 20, right: 10, bottom: 30, left: 60},
		width = bodyWidth - margin.left - 40,
		height = 250 - margin.top - margin.bottom,
		xScale = d3.scaleLinear().rangeRound([0, width]),
		yScale1 = d3.scaleBand().padding(.2),
		yScale0 = d3.scaleBand().rangeRound([height, 0]).padding(.2),
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
     return (<div id="chartContainer" style={styles.chartContainer}>
        <div style={styles.chartTitle}>{this.props.title}</div>
     	<div id="stacked-bar"></div>
     	</div>);
   }
   
   
}
