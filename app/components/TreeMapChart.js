import MyChart from './MyChart';
import {DataFilter} from '../reducers/actions';

export default class TreeMapChart extends MyChart {

    constructor(props) {
        super(props);
        this.props.options.series[0].point.events.select = this.onSelect.bind(this);
        this.props.options.series[0].point.events.unselect = this.onUnSelect.bind(this);
    }

    onSelect(e) {
        console.log("using TreeMapChart class", e, this.state.selected);
    }

    onUnSelect(e) {
        console.log("using TreeMapChart class", e, this.state.selected);
    }
}
