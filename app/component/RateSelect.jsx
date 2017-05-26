/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/06/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/18/2017
 */

import React from 'react';
import '../static/css/city-select.scss';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';

export default class RateSelect extends React.Component {
    constructor(props) {
        super(props);

        let {mobxState} = this.props;

        this.state = {
            data: this.props.data,
            list: mobxState.params[this.props.data.paramsType] || []
        };
    }
    componentWillMount() {
        let {event} = this.props;
        event && this.eventHandler(event);
    }
    componentWillReceiveProps(nextProps) {
        let {event,data,mobxState} = nextProps;
        event && this.eventHandler(event);
        data && mobxState && this.setState({data,list: mobxState.params[data.paramsType] || []})
    }
    eventHandler(event) {
        let {mobxState,data} = this.props;
        let {list} = this.state;
        let params = {};
        if (event === 'submit') {
            params[data.paramsType] = list;
            mobxState.setParams(params);
        } else if (event === 'reset') {
            params[data.paramsType] = [];
            mobxState.setParams(params);
            this.setState({list:[]})
        }
    }
    setMobxState(list = [],range_begin = '',range_end = '') {
		let {data} = this.state;
		let {mobxState} = this.props;
        let params = {};
		params[data.paramsType] = data.cmpType == 'radio-box' ? list.toString() : list; // 不同的筛选类型做不同的处理

		mobxState.setParams(params);
	}
    onSelect(val) {
        let {list,data} = this.state;
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

        let list0 = list.map((item)=>item);
        this.setMobxState(list0);
		this.setState({list:list0});
    }
    onSelectAll() {
        let {data,list} = this.state;
        let list0 = list.length === data.list.length ? [] : data.list.map((item)=>item.val);
        this.setState({
            list:list0
        });
        this.setMobxState(list0);
    }
    render() {
        let {data,list} = this.state;
        let half = Math.ceil(data.list.length/2);
        // <li className={list.length === data.list.length ? 'active' : ''} onTouchTap={this.onSelectAll.bind(this)}><i className="check-box"></i>全部</li>
        return (
            <div className="city-select">
                <div className="scroll-area">
                    <div className="left">
                        <ReactIScroll iScroll={iScroll}
                            onScrollStart={this.onScrollStart}
                            onScrollEnd={this.onScrollEnd}>
                            <ul>
                                {
                                    data.list.slice(0,half).map((item)=>(
                                        <li className={list.indexOf(item.val) > -1 ? 'active' : ''} onTouchTap={this.onSelect.bind(this,item.val)} key={item.val} name={item.name}><i className="check-box"></i>{item.name}</li>
                                    ))
                                }
                            </ul>
                        </ReactIScroll>
                    </div>
                    <div className="right">
                        <ReactIScroll iScroll={iScroll}
                            onScrollStart={this.onScrollStart}
                            onScrollEnd={this.onScrollEnd}>
                            <ul>
                            {
                                data.list.slice(half).map((item)=>(
                                    <li className={list.indexOf(item.val) > -1 ? 'active' : ''} onTouchTap={this.onSelect.bind(this,item.val)} key={item.val} name={item.name}><i className="check-box"></i>{item.name}</li>
                                ))
                            }
                            </ul>
                        </ReactIScroll>
                    </div>
                </div>
                <div style={{clear:'both'}}></div>
            </div>
        )
    }
}
