/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/06/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/18/2017
 */

import React from 'react';
import '../static/css/select-list.scss';
import moment from 'moment';
import { DatePicker } from 'antd-mobile';

const minDate = moment('1970-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const maxDate = moment('2070-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);

class SelectList extends React.Component {
	constructor(props) {
		super(props);
		this.type = 'TODO'; // 具体的类型
		let {data,mobxState} = this.props;

		let {dateList,rangeBegin,rangeEnd} = mobxState.params;

		this.state = {
			list: this.initList(this.props),
			data: this.props.data,
			range_begin: rangeBegin || '',
			range_end: rangeEnd || ''
		};

		this.range_begin = rangeBegin || '';
		this.range_end = rangeEnd || '';
		this.minDate = this.props.minDate || minDate;
		this.maxDate = this.props.maxDate || maxDate;
	}
	componentWillMount() {
		let self = this,
			{event} = this.props;

		event && this.eventHandler(event);
	}
	componentWillReceiveProps(nextProps) {
		let {event,data,mobxState} = nextProps;
		let list = mobxState.params[data.paramsType];
		event && event !== this.props.event && this.eventHandler(event);
		data && this.setState({data,list: this.initList(nextProps)});
	}
	initList(props) {
		let {data,mobxState} = props;
		let {rangeStart,rangeEnd} = mobxState.params;
		let list = mobxState.params[data.paramsType];
		return list instanceof Array ? list : (list ? [list] : (data.type === 'date' && !!!rangeStart && !!!rangeEnd ? [''] : []));
	}
	eventHandler(event) {
		let {mobxState} = this.props;
		let {selectedName,selectedItem,range_begin,range_end,data,list} = this.state;
		let params = {};

		if (event === 'submit') {
			if (range_begin && range_end) {
				params['range_begin'] = range_begin;
				params['range_end'] = range_end;
			} else {
				params[data.paramsType] = data.cmpType == 'radio-box' ? list.toString() : list; // 不同的筛选类型做不同的处理
			}
			mobxState.setParams(params);
		} else if (event === 'reset') {
			params['range_begin'] = '';
			params['range_end'] = '';
			params[data.paramsType] = data.cmpType == 'radio-box' ? '' : [];;
			mobxState.setParams(params);
			this.setState({list:[],range_begin:'',range_end:''});
		}

	}
	setParams(list = [],range_begin = '',range_end = '') {
		let {data} = this.state;
		let {mobxState} = this.props;
		let params = {};
		params[data.paramsType] = data.cmpType == 'radio-box' ? list.toString() : list; // 不同的筛选类型做不同的处理
		if (data.type === 'date') {
			params['range_begin'] = range_begin;
			params['range_end'] = range_end;
		}

		return params;
	}
	onSelect(val) {
		let {list,data} = this.state,
			{onSubmit,onClose} = this.props;
		let index = list.findIndex((item) => item == val);
		// 单选或者复选的判断
		if (data.cmpType == 'radio-box') {
			list = []
		}
		if (index > -1) {
			list.splice(index, 1)
		} else {
			list.push(val)
		}
		this.setState({list});
		onSubmit && onSubmit(this.setParams(list));
		onClose && onClose();
	}
	onChange(type,date) {
		let state = {},
			{onSubmit} = this.props;
		this[type] = state[type] = date.format('YYYY-MM-DD');
		state.list = [];
		if (type === 'range_begin') {
			this.minDate = date;
		} else if (type === 'range_end'){
			this.maxDate = date;
		}

		if (this.range_begin && this.range_end) {
			state.list = [];
			onSubmit && onSubmit([],this.range_begin,this.range_end);
			this.props.onClose();
		}
		this.setState(state);
	}
	render() {
		let {data, list, range_begin, range_end} = this.state;
		return (
			<div className={this.props.className || 'select-list'}>
				{data.list.map((item) => <div className={list.indexOf(item.val) > -1
					? "select-item active"
					: "select-item"} name={item.type} key={'key' + item.val} onClick={() => {
					this.onSelect(item.val);
				}}>
					<div className="select-item-left">
						<span>{item.name}</span>
					</div>
					<div className="select-item-right">
						<i></i>
					</div>
				</div>)}
				{data.rangeSelect
					? <div className="range-select">
						<DatePicker
						  className="g-datepicker"
						  mode="date"
						  title="选择日期"
						  minDate={this.minDate}
						  maxDate={maxDate}
						  onChange={this.onChange.bind(this,'range_begin')}
						>
							<div className="date-picker">
								{range_begin || "开始时间"}
							</div>
						</DatePicker>
						<span className="seperator">至</span>
						<DatePicker
						  className="g-datepicker"
						  mode="date"
						  title="选择日期"
						  minDate={minDate}
						  onChange={this.onChange.bind(this,'range_end')}
						>
							<div className="date-picker">
								{range_end || "结束时间"}
							</div>
						</DatePicker>
					  </div>
					: null}

			</div>
		)
	}
}

export default SelectList;
