/**
 * @Author: tangjingxin <jxintang>
 * @Date:   03/15/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/18/2017
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {RefreshControl, ListView} from 'antd-mobile';
import {get} from 'logics/rpc';
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

		this.state = {
			dataSource: dataSource.cloneWithRows(this.initData),
			refreshing: false,
			offset: -1,
			index: 1
		};

	}

    offset = -1; //初始化分页
    data = []; //初始化数据
    componentWillMount = () => {
		this.initData(true,this.props.data);
    };
    initData =(refresh = false,data = null) => {
        if (data === null) return;
        let {list} = data;
		this.isFetching = true;

        if (refresh) {
            this.data.splice(0,this.data.length,...(list || []));
        } else {
            this.data.splice(this.data.length, 0, ...(list || []));
        }

        this.setState({
            dataSource: dataSource.cloneWithRows(this.data),
			refreshing: false
        })

        this.isFetching = false;
        this.isRefreshing = false;
        this.offset = data.offset;
        this.total = data.total;
    }
	componentWillReceiveProps(nextProps) {
		let {data} = nextProps;
        // 这边的逻辑后续需要调整
        if (data) {
            let {offset,total} = data;
            if (typeof offset !== 'undefined') {
                if (offset === 0) {
                    this.initData(true,data);
                } else if (offset !== this.offset || total !== this.total) {
                    this.initData(false,data);
                }
            } else {
                this.initData(true,data);
            }
        }
	}
	removeNullParams = (params) => {
		for (var i in params) {
			if (params[i] === '' || params[i] === null || params.length === 0) {
				delete params[i];
			}
		}

		return params;
	}
	onRefresh = () => {
		this.props.fetch && this.props.fetch(true);
		this.refreshing = true;
		this.setState({refreshing: true});
	};
	hasMore = ()=> {
		return (typeof this.total !== 'undefined' && this.total !== this.data.length) || false;
	}
	onEndReached = (event) => {
	    console.log('onEndReached');
        let {isLoading,offset} = this.state;
		if (this.state.isLoading || this.isFetching || !this.hasMore()) return;

        this.props.fetch && this.props.fetch();
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
						renderFooter={this.renderFooter} style={{
						height: document.documentElement.clientHeight - TABBAR_HEIGHT - NAV_HEIGHT - (offsetHeight || 0),
						margin: '0.1rem 0',
						padding: 0
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
				<div className="no-results"><span>无搜索结果</span></div>
			)
		}
	}
}
