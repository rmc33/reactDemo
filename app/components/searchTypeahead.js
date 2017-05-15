import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Button, Grid, Row, Col, Clearfix } from 'react-bootstrap';
import jQuery from 'jquery';
const $ = jQuery;
window.jQuery = $;
import chosen from 'bootstrap-chosen/dist/chosen.jquery-1.4.2/chosen.jquery';
import chosenStyle from 'bootstrap-chosen/bootstrap-chosen.css';
import typeaheadStyle from './typeahead-container.less';

const searchOptions = [
	{id:'',value:''},
	{id: 'optimize_launch', value: 'Optimize: Launch'},
	{id: 'metrics_launch', value: 'Metrics: Launch'},
	{id: 'investigation_view_launch', value: 'Investigation View: Launch'},
	{id: 'tldadmin', value: 'TLD Admin: Launch'},
	{id: 'optimize_search_trade_id', value: 'Optimize: Search Trade ID', recordType: {required: ["Trade ID"]}},
	{id: 'optimize_search_cptyname', value: 'Optimize: Search CPTY Name', recordType: {required: ["CPTY Name"]}},
	//{id: 'optimize_search_filter_name', value: 'Optimize: Search By Filter Name', recordType: {optional: }},
	{id: 'metrics_search_cptyname', value: 'Metrics: Breakdown By CPTY Name', recordType: {required: ["CPTY Name"]}},
	{id: 'investigation_view_search_cptyname', value: 'Investigation View: Filter By CPTY Name', recordType: {required: ["CPTY Name"]}},
	{id: 'tldamdin', value: 'TLD Admin: View User Data Entitlements', recordType: {required: ["User Name"]}},
	{id: 'metrics_search_trader', value: 'Metrics: Breakdown By Trader User Name', recordType: {required: ["CPTY Name"]}}
];

export default class SearchTypeahead extends React.Component {

	constructor(props) {
		super(props);
		this.handleChangeTask = this.handleChangeTask.bind(this);
		this.renderTasks = this.renderTasks.bind(this);
		this.bindTasks = this.bindTasks.bind(this);
		this.removeTaskRow = this.removeTaskRow.bind(this);
		this.state = {tasks: [
			{id: 'task1'}
		]};
	}

	componentDidMount() {
		//this.refs.search_input.focus();
		this.bindTasks();
	}

	componentDidUpdate() {
		this.bindTasks();
		let set_focus = $('.set_focus').length;
		if (set_focus) {
			set_focus.focus();
			set_focus.removeClass('set_focus');
		}
	}

	//save changes to search input
	//search view search_value is now used to get value of search instead of accessing dom
	handleChangeTask(event) {
	 	if (event) {

		 	//this.setState({search_value: event.target.value});
		 	//this.props.doSearch(event.target.value);
		}
	}

	displayResults() {
	 	if (this.props.data) {
	 		return (
	 			<div>
	    	results:
	    	{
	    	  this.props.data.map((result) => {
				return <div>{result}</div>
			  })
			}
			</div>
	 		);
	 	}
	}

	renderSearchOptions() {
		return searchOptions.map((option) => {
			return <option value={option.value}>{option.value}</option>
		});
	}

	removeTaskRow(index) {
		let tasks = [...this.state.tasks];
		if (index > 0)
			delete tasks[index];
		this.setState({tasks});
	}

	renderTasks() {
		return this.state.tasks.map((task, index) => {
			const task_name = `task_input_${index}`;
			const task_input = task.recordType ? <input type="text" className="set_focus" name={task_name} placeholder={task.recordType.required[0]}/> : '';
			return (<div className="task_row"><div className="task_select">
				<select data-placeholder="Select a task" className="search_input" id={task.id} onChange={this.handleChangeTask}>
		        {this.renderSearchOptions()}
		        </select>
		        </div>
		        {task_input}
		        <a className="close" onClick={this.removeTaskRow(index)}></a>
		        </div>);
		});
	}

	bindTasks() {
		this.state.tasks.forEach((task, index) => {
			const chosen_task = $('#' + task.id + '_chosen');
			console.log('adding chosen for tastk ' + task.id, chosen_task);
			if (chosen_task.length == 0) {
				$('.is_last').removeClass('is_last');
				$('#' + task.id).addClass('is_last');
				$('#' + task.id).chosen({width: '100%'}).change((event) => {
					console.log('task change ' + task.id, event, $(event.target).val());
					let all_tasks = [...this.state.tasks];
					let event_task = this.state.tasks.find((item) => {
	    				return item.id == $(event.target).attr('id');
	    			});
	    			let searchOption = searchOptions.find((item) => {
	    				return item.value == $(event.target).val();
	    			});
	    			event_task.recordType = searchOption.recordType;
	    			//update event task record type and add new task if last one
	    			if ($(event.target).hasClass('is_last')) {
	    				let new_task = 'task'+(this.state.tasks.length+1);
	    				all_tasks.push({id: new_task});
	    			}
					this.setState({'tasks': all_tasks});
				});
			}
		});
	}

	render() {
		return (
		    <div className="typeahead-container">
		    	{this.renderTasks()}
		        <div className="button_menu">
		        	<button name="clear_workflow">Clear Workflow</button>
		        	<button name="save_workflow">Save Workflow</button>
		        	<button name="open_workflow">Open Workflow</button>
		        	<button name="show_history">Recent History</button>
		        </div>
		    </div>
		);
	}

}