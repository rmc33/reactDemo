import React from 'react';
import { render } from 'react-dom';
import { Button, Grid, Row, Col, Clearfix } from 'react-bootstrap';
import { connect } from 'react-redux';
import {addFilterRequest, removeFilterRequest} from '../reducers/actions';
import LineChart from './LineChart';

var Treemap = require('highcharts/modules/treemap.src'),
	
	styles = {
		chart: {
			height: '260px',
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

	lineChart = {
        title: "Monthly Average Temperature",
        options: {
            onSelectCallBack: function(e) {
                console.log("called back", this, e);
            },
            title: {
                text: '',
                //x: -20 //center
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°C'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [
                {
                    allowPointSelect: true,
                    point: {
                        events: {

                        }
                    },
                    name: 'Tokyo',
                    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }, {
                    name: 'New York',
                    data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
                }, {
                    name: 'Berlin',
                    data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
                }, {
                    name: 'London',
                    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                }
            ]
        }
    },

    treemap = {
        title: "Fruit consumption",
        options: {
            onSelectCallBack: function(e) {
                console.log("called back", this, e);
            },
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
        
    };

class App extends React.Component {

  constructor(props) {
  	super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    require(["testAMD"], function(a) {
        console.log('did loaded', a);
    });
  }

  componentWillReceiveProps(nextProps) {
     console.log("got nextProps", nextProps); 
  }

  render () {
    
    let filterActions = {
        addFilterRequest: this.props.addFilterRequest, 
        removeFilterRequest: this.props.removeFilterRequest
    };

    return <div>
	  <Grid fluid={true}>
	    <Row className="show-grid" style={styles['show-grid']}>
	      <Col md={6} lg={6} style={styles.chartCol}>
            <LineChart {...filterActions} title={lineChart.title} options={lineChart.options} container={'chart-funnel'} style={styles.chart}>
            </LineChart>
          </Col>
	      <Col md={6} lg={6} style={styles.chartCol}>
            <LineChart {...filterActions} title={treemap.title} options={treemap.options} container={'chart-treemap'} style={styles.chart} modules={[Treemap]}>
            </LineChart>
          </Col>
	    </Row>
	  </Grid>
	  </div>;
  }

}

function mapStateToProps(state) {
    console.log('map state to props state', state);
    return {
        charts: state.charts
    };
}

const mapDispatchToProps =  ({
  addFilterRequest: addFilterRequest,
  removeFilterRequest: removeFilterRequest
})

export default connect(mapStateToProps, mapDispatchToProps)(App);