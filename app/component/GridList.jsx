/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/13/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/25/2017
 */

/**
 * created by jxintang on 3/13/17.
 */

import React from 'react';
import '../static/css/grid-list.scss';
import moment from 'moment';
import { DatePicker } from 'antd-mobile';

let minDate = moment('1970-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
let maxDate = moment('2070-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);

export default class GridList extends React.Component {
    constructor(props) {
      super(props);
      let {data,mobxState} = this.props;
      this.state = {
          list: data.cmpType == 'radio-box' ? (mobxState && mobxState.params[data.paramsType] ? mobxState.params[data.paramsType].toString() : '') : (mobxState.params[data.paramsType] || []),
          range_begin:mobxState && mobxState.params.range_begin || '',
          range_begin:mobxState && mobxState.params.range_end || '',
          data
      };
    }
    componentWillMount() {
		let self = this,
			{event} = this.props;

		event && this.eventHandler(event);
	}
    componentWillReceiveProps(nextProps) {
		let {event} = nextProps;
		event && event !== this.props.event && this.eventHandler(event);
	}
    eventHandler(event) {
		let {mobxState} = this.props;
		let {list,range_begin,range_end,data} = this.state;
		let params = {};

		if (event === 'submit') {
			if (range_begin && range_end) {
				params['range_begin'] = range_begin;
				params['range_end'] = range_end;
                params[data.paramsType] = data.cmpType == 'radio-box' ? '' : [];
			} else {
                params['range_begin'] = '';
                params['range_end'] = '';
				params[data.paramsType] = data.cmpType == 'radio-box' ? list.toString() : list;
			}
			mobxState.setParams(params);
		} else if (event === 'reset') {
			mobxState.setParams({range_begin:'',range_end:'',list:[]});
			this.setState({list:data.cmpType == 'radio-box' ? '' : [],range_begin:'',range_end:''});
		}
	}
    onSelect(val) {
        let {onClick} = this.props;
        let {list,data} = this.state;
        let index = list.indexOf(val);
        let obj = {};

        if (data.cmpType == 'radio-box') {
            list = [];
        }

        if (index > -1) {
			list.splice(index, 1)
		} else {
			list.push(val)
		}
		this.setState({list,range_begin:'',range_end:''});
        onClick && onClick.call(this,val);
    }
    onChange(type,date) {
		let state = {}, obj = {};
		state[type] = date.format('YYYY-MM-DD');
		state.list = [];
		this.setState(state);
	}
    render () {
        let {data,list, range_begin, range_end} = this.state;
        return (
            <div className="grid-container">
                <div className="grid-title">
                    {data.title}
                </div>
                <ul className="grid-list">
                    {data.list.map((item,index)=> (
                        <li className={list.indexOf(item.val) > -1 ? 'grid-item active' : 'grid-item'} key={item.val} onClick={()=>{this.onSelect(item.val)}}>{item.name}</li>
                    ))}
                </ul>
                <div style={{clear:'both'}}></div>
                {data.rangeSelect
					? <div className="range-select">
						<DatePicker
						  mode="date"
						  title="选择日期"
						  maxDate={maxDate}
						  onChange={this.onChange.bind(this,'range_begin')}
						>
							<div className="date-picker">
								{range_begin || "开始时间"}
							</div>
						</DatePicker>
						<span className="seperator">至</span>
						<DatePicker
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
