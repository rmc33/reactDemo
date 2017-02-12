import MyChart from './MyChart';
import {DataFilter} from '../reducers/actions';

export default class LineChart extends MyChart {

    
    constructor(props) {
        super(props);
       this.props.options.series[0].point.events.select = this.onSelect.bind(this);
       this.props.options.series[0].point.events.unselect = this.onUnSelect.bind(this);
    }

    onSelect(e) {
        console.log("using LineChart class", e, this.state.selected);
        this.props.addFilterRequest(new DataFilter('Month', 'month', [e.target.category]), this.state.selected > 0 && !e.accumulate);
        this.setState({'selected': ++this.state.selected});
    }

    onUnSelect(e) {
        console.log("using LineChart class", e, this.state.selected);
        this.props.removeFilterRequest(new DataFilter('Month', 'month', [e.target.category]));
        this.setState({'selected': --this.state.selected});
    }
}
