const React = require('react');
const ReactDOM = require('react-dom');
const Highcharts = require('highcharts');


const styles = {
    chartTitle: {
        'border-bottom': '2px solid #E6E9ED',
        'padding': '1px 5px 5px',
        'margin-bottom': '10px'
    },
    chartContainer: {
        position: 'relative',
        width: '100%',
        'margin-bottom': '10px',
        'padding': '10px 10px',
        'display': 'inline-block',
        'background': '#fff',
        'border': '1px solid #E6E9ED',
        '-webkit-column-break-inside': 'avoid',
        '-moz-column-break-inside': 'avoid',
        'column-break-inside': 'avoid',
        'opacity': 1,
        'transition': 'all .2s ease',
        'text-align': 'center'
    }
};

class MyChart extends React.Component {

    constructor(props) {
      super(props);
      console.log("starting MyChart");
    }
    // When the DOM is ready, create the chart.
    componentDidMount() {
	    
	    // Extend Highcharts with modules
	    if (this.props.modules) {
	        this.props.modules.forEach(function (module) {
	            module(Highcharts);
	        });
	    }
	    
	    // Set container which the chart should render to.
	    this.chart = new Highcharts[this.props.type || "Chart"](
	        this.props.container, 
	        this.props.options
	    );

        this.setState({'selected': 0});

    }

    //Destroy chart before unmount.
    componentWillUnmount() {
        this.chart.destroy();
    }

    //Create the div which the chart will be rendered to.
    render() {
        return <div style={styles.chartContainer}>
            <div style={styles.chartTitle}>{this.props.title}</div>
            <div id={this.props.container} style={this.props.style}></div>;
        </div>
    }
}

export default MyChart;