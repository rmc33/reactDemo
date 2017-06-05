import React from 'react';
import { render } from 'react-dom';
import { Button, Grid, Row, Col, Clearfix } from 'react-bootstrap';
import { connect } from 'react-redux';
import {addFilterRequest, removeFilterRequest} from '../reducers/actions';
import LineChart from './LineChart';
import TreeMapChart from './TreeMapChart';
var plainMod = require("./plainMod");
import appCss from '../css/app.css';
import jQuery from 'jquery';
const $ = jQuery;

function openDialog(evt,series) {
	    console.log('click evt=', evt, arguments);
        let clickedX = evt.pageX;
        let rect = $(evt.target);
        let tooltip = $("<div>", {id: "tooltip", 
        	"class": "popper",
        	"x-placement": "bottom"
        }).html(`<p class="bold">Product Group</p>
			    Key:<span class="thin">Value</span>
			    <div class="popper__arrow_outline"></div><div class="popper__arrow"></div>`)
			.css("top", (rect.offset().top + rect.height()) + 'px');
			
		console.log('tooltip =', tooltip); 
		
		$('body').append(tooltip);
			
		 let width = tooltip.width() / 2;
		 console.log(`width=${width},clickedX=${clickedX}`);
		 tooltip.css('left', (clickedX - width - 10)+'px')
		 	.addClass('shown')
		 	.find('.popper__arrow')
		 	.css({
       	 		left: (width) + 'px' 
       	 	});
}

var Treemap = require('highcharts/modules/treemap.src'),
	
	styles = {
		chart: {
			height: '260px',
			width: 'inherit'
		},
        chartCol: {
            'position': 'relative',
            'min-height': '1px',
            'float': 'left',
            'padding-right': '5px',
            'padding-left': '5px',
        },
        'show-grid': {
            'padding-left': '5px',
            'padding-right': '5px',
            'padding-top': '10px',
            'padding-bottom': '10px'

        }
	},

    chartObjects = [
        {
            chartComponent: LineChart,
            title: "Products Grouped By Status Highcharts",
            container: 'linecontainer',
            options: {
                chart: {
			        type: 'bar'
			    },
			    title: {
			        text: null
			    },
			    xAxis: {
			        categories: ['Product 1', 'Product 2', 'Product 3']
			    },
			    yAxis: {
			        min: 0,
			        title: {
			            text: ''
			        }
			    },
			    legend: {
			        enabled: false
			    },
			    
			    plotOptions: {
			        series: {
			            stacking: 'normal',
			            point: {
			            events: {
				            click: function(evt) {
				            	$('#tooltip').remove();
				            	openDialog(evt,this);
				            },
				            mouseOver: function(evt) {
				            	console.log(evt);
				            	evt.target.graphic.element.style.cursor = 'pointer';
				            	evt.target.graphic.element.style.opacity = '.8';
				            },
				            mouseOut: function(evt) {
				            	console.log(evt);
				            	evt.target.graphic.element.style.cursor = 'default';
				            	evt.target.graphic.element.style.opacity = '1';
				            }
				        }
				       }             
			        }
			    },
			    tooltip: {
    				enabled: false,
    				useHTML: true
				},
			    colors: [
			    	'red', 'orange', 'green'
			    ],
			   series: [{
			        name: 'Group 1 R',
			        data: [5, 3, 4],
			        stack: 'group 1'
			    },
			    {
			        name: 'Group 1 A',
			        data: [5, 3, 4],
			        stack: 'group 1'
			    }
			    , 
			    {
			        name: 'Group 1 G',
			        data: [3, 4, 4],
			        stack: 'group 1'
			    },
			    {
			        name: 'Group 2 R',
			        data: [3, 4, 4],
			        stack: 'group 2'
			    }
			    , {
			        name: 'Group 2 A',
			        data: [2, 5, 6],
			        stack: 'group 2'
			    }, {
			        name: 'Group 2 G',
			        data: [3, 1, 4],
			        stack: 'group 2'
			    }
			    ]
            }
                
        },
        /**
        {
            chartComponent: TreeMapChart,
            title: "Fruit consumption",
            container: 'treecontainer',
            modules: [Treemap],
            options: {
                serviceName: 'exampleService',
                series: [{
                    type: "treemap",
                    layoutAlgorithm: 'stripes',
                    alternateStartingDirection: true,
                    levels: [{
                        level: 1,
                        layoutAlgorithm: 'sliceAndDice',
                        dataLabels: {
                            enabled: true,
                            align: 'left',
                            verticalAlign: 'top',
                            style: {
                                fontSize: '15px',
                                fontWeight: 'bold'
                            }
                        }
                    }],
                    allowPointSelect: true,
                    point: {
                        events: {

                        }
                    },
                    data: [{
                        id: 'A',
                        name: 'Apples',
                        color: "#EC2500"
                    }, {
                        id: 'B',
                        name: 'Bananas',
                        color: "#ECE100"
                    }, {
                        id: 'O',
                        name: 'Oranges',
                        color: '#EC9800'
                    }, {
                        name: 'Anne',
                        parent: 'A',
                        value: 5
                    }, {
                        name: 'Rick',
                        parent: 'A',
                        value: 3
                    }, {
                        name: 'Peter',
                        parent: 'A',
                        value: 4
                    }, {
                        name: 'Anne',
                        parent: 'B',
                        value: 4
                    }, {
                        name: 'Rick',
                        parent: 'B',
                        value: 10
                    }, {
                        name: 'Peter',
                        parent: 'B',
                        value: 1
                    }, {
                        name: 'Anne',
                        parent: 'O',
                        value: 1
                    }, {
                        name: 'Rick',
                        parent: 'O',
                        value: 3
                    }, {
                        name: 'Peter',
                        parent: 'O',
                        value: 3
                    }, {
                        name: 'Susanne',
                        parent: 'Kiwi',
                        value: 2,
                        color: '#9EDE00'
                    }]
                }],
                title: {
                    text: ''
                }
            }
        }*/
    ];

class App extends React.Component {

  constructor(props) {
  	super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    require(["testAMD"], function(a) {
        console.log('did loaded async - please ignore this test :)');
        a('#testWidth');
    });
    console.log("startin gtest", plainMod);
    plainMod.value();
    plainMod.increment();
    console.log("testMod=",plainMod.value());
  }

  componentWillReceiveProps(nextProps) {
     console.log("got nextProps", nextProps); 
  }

  render () {

    return <div>
	  <Grid fluid={true}>
	    <Row className="show-grid" style={styles['show-grid']}>
	      {this.renderCharts()}
	    </Row>
        <Button id="testJquery"/>
        <div id="testWidth"/>
	  </Grid>
	  </div>;
  }

  renderCharts() {

    let filterActions = {
        addFilterRequest: this.props.addFilterRequest, 
        removeFilterRequest: this.props.removeFilterRequest
    };

    return chartObjects.map(function(item) {
        return <Col md={12} lg={12} style={styles.chartCol}>
            <item.chartComponent {...filterActions} title={item.title} options={item.options} container={item.container} style={styles.chart} modules={item.modules}>
            </item.chartComponent>
        </Col>;
     });
  }
}

function mapStateToProps(state) {
    console.log('map state to props state', state);
    return {
        charts: state.charts
    };
}

const mapDispatchToProps = ({
  addFilterRequest: addFilterRequest,
  removeFilterRequest: removeFilterRequest
})

export default connect(mapStateToProps, mapDispatchToProps)(App);