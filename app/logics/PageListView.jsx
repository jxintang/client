/**
 * @Author: tangjingxin <jxintang>
 * @Date:   03/15/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/11/2017
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {RefreshControl, ListView} from 'antd-mobile';
import {get} from './rpc';
import queue from './queue';
import {TABBAR_HEIGHT,NAV_HEIGHT} from '../route/const';

const PAGE_SIZE = 10;
const OFFSET = 0;
let number = 0;
const dataSource = new ListView.DataSource({
	rowHasChanged: (row1, row2) => row1 !== row2
});

export default class PageListView extends React.Component {
	constructor(props) {
		super(props);

		let {uri,params} = this.props;

		this.initData = [];
		this.state = {
			dataSource: dataSource.cloneWithRows(this.initData),
			refreshing: false,
			offset: -1,
			index: 1
		};

        this.requestQueue = [];
	}
    componentWillMount = () => {
		let {params,doFetch} = this.props;
		if (typeof(doFetch) === "boolean" && doFetch) {
			this.fetch(0,this.props.params);
		}
    };
	componentWillReceiveProps(nextProps) {
		let {params,doFetch} = nextProps;
		if (typeof(doFetch) === "boolean" && doFetch) {
			this.refreshing = true;
			this.fetch(0,params);
		}
	}
	hasMore() {
		return (typeof this.total !== 'undefined' && this.total !== this.initData.length) || false;
	}
    async fetch(offset = 100,params = {}) {
		let {refreshing} = this;
        queue.push({id:offset});

		params = this.removeNullParams(params);

		// 防止过多请求
		if (offset > 0 && this.state.offset !== -1 && this.state.offset !== offset) return;

		this.isLoading = true;

		var data = await get(this.props.uri,{method:'POST',body:Object.assign({offset},params)});

        queue.deleteById(data.offset);

		// TODO @xiangtao 空的时候需要返回数组
		data.list = data.list || []
		if (refreshing) {
			this.initData.splice(0,this.initData.length,...data.list);
		} else {
			this.initData = this.initData.concat(data.list);
		}

		this.setState({
            dataSource: dataSource.cloneWithRows(this.initData),
            refreshing: false,
			offset: data.offset + data.limit || OFFSET + data.limit || PAGE_SIZE,
			hasMore: this.initData.length !== (data.total || data.list.length)
        });
		this.refreshing = false;
		this.isLoading = false;
		this.total = data.total;

	};
	removeNullParams = (params) => {
		for (var i in params) {
			if (params[i] === '' || params[i] === null || params.length === 0) {
				delete params[i];
			}
		}

		return params;
	}
	onRefresh = () => {
		this.refreshing = true;
		this.setState({refreshing: true});
		this.fetch(0,this.props.params);
	};
	onEndReached = (event) => {
        let {isLoading,offset} = this.state;
		if (this.isLoading || !this.hasMore()) return;

		this.fetch(offset,this.props.params);
		// setTimeout(() => {
		// 	this.fetch(offset,this.props.params);
		// },1000);
		// 官方有bug，需要从长计议
	};
	renderRow =(rowData,rowID) => {
		let Cmp = this.props.rowCmp;
		return <Cmp item={rowData} key={rowID} />;
	}
	renderFooter = () => {
		let text = '';
		if (this.hasMore()) {
			text = '上拉加载更多';
		} else if (this.initData.length >= 10) {
			text = '无更多内容';
		}
		return (
			<div style={{padding: 10,textAlign: 'center'}}>{text}</div>
		)
	}
	render() {
		let {dataSource,offset} = this.state;
		let {offsetHeight} = this.props;

		if (dataSource.rowIdentities[0].length) {
			return (
				<div className="list-view-body">
					<ListView
						dataSource={this.state.dataSource}
						renderRow={(rowData, sectionID, rowID) => (this.renderRow(rowData,rowID))}
						initialListSize={10}
						pageSize={10}
						scrollEventThrottle={20}
						onEndReached={this.onEndReached}
						scrollRenderAheadDistance={500}
						onEndReachedThreshold = {10}
						renderFooter={this.renderFooter}
						style={{
						height: document.documentElement.clientHeight - TABBAR_HEIGHT - NAV_HEIGHT - (offsetHeight || 0),
						padding: 0,
						border: 'none'
					}} scrollerOptions={{
						scrollbars: true
					}} refreshControl={< RefreshControl refreshing = {
						this.state.refreshing
					}
					onRefresh = {
						this.onRefresh
					} />}/>
				</div>
			);
		} else if (offset === -1) {
			return null; // 初始化数据时候TODO
		} else {
			return (
				<div className="no-results"><span>暂无信息</span></div>
			)
		}
	}
}
