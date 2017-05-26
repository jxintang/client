/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/22/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/25/2017
 */

import React from 'react';
import { observer } from 'mobx-react';
import BondItem from 'component/BondItem.jsx';
import BondSelect from 'component/BondSelect.jsx';
import TableListView from 'component/TableListView';
import 'rc-dialog/assets/index.css';
import {
	SearchBar,
	Tabs,
	WhiteSpace
} from 'antd-mobile';
import RateSelect from 'component/RateSelect.jsx';
import CitySelect from 'component/CitySelect.jsx';
import SelectList from 'component/SelectList.jsx';
import FilterBar from 'component/FilterBar/index.jsx';
import FilterBar1 from 'component/FilterBar1.jsx';
import Mask from 'component/Mask.jsx';
import issuerState from 'mobx-state/IssuerState';
import bondState from 'mobx-state/BondTableState';
import ReactIScroll from 'react-iscroll';
import PageListView from 'logics/PageListView.jsx';
import iScroll from 'iscroll/build/iscroll-probe';
import {CONTENT_HEIGHT,TABBAR_HEIGHT,NAV_HEIGHT,STORAGE_ISSUER_LIST,STORAGE_BOND_LIST,DATE_LIST,RATE_LIST} from '../../const.js';
import 'static/css/tab-style.scss'

const TabPane = Tabs.TabPane;
const renderCenter = (v) => (<div className="text-center">{v}</div>);

const RateChangeList = {
	cmpType: 'radio-box',
	paramsType: 'rating_change',
	list: [
		{
			name: '主体调高',
			val: '调高',
			type: 'rate'
		}, {
			name: '主体调低',
			val: '调低',
			type: 'rate'
		}
	]
};

const BondRateList = {
	cmpType: 'radio-box',
	paramsType: 'rating_change',
	list: [
		{
			name: '债项调高',
			val: '调高',
			type: 'rate'
		}, {
			name: '债项调低',
			val: '调低',
			type: 'rate'
		}
	]
};

const columns = [
	{
		title: '债券简称',
		dataIndex: 'abbrev_name',
		key: 'abbrev_name',
		width: 100,
		fixed: 'left'
	}, {
		title: '债券代码',
		dataIndex: 'wind_code',
		key: 'wind_code',
		width: 100,
	}, {
		title: '发行人',
		dataIndex: 'issuer_name',
		key: 'issuer_name',
		width: 100,
		render: (value) => (
	        <div className="fix-width">{value}</div>
	    )
	}, {
		title: '变动方向',
		dataIndex: 'rating_change',
		key: 'rating_change',
		width: 100, render: (v) => renderCenter(v)
	}, {
		title: '债项评级',
		dataIndex: 'current_rating',
		key: 'current_rating',
		width: 100,
		render:(value,row,index)=>(
			<div>
				{row.current_rating ? <div style={{color:'#AD2323'}}>{row.current_rating}(本次)</div> : null}
				{row.previous_rating ? <div>{row.previous_rating}(上次)</div> : null}
			</div>
		)
	}, {
		title: '评级时间',
		dataIndex: 'current_rating_date',
		key: 'current_rating_date',
		width: 100,
		render:(value,row,index)=>(
			<div className="text-center" style={{color:'#666'}}>
				<div>{value || '-'}</div>
				<div>{row.previous_rating_date || '-'}</div>
			</div>
		)
	}, {
		title: '债券类型',
		dataIndex: 'industry_name1',
		key: 'industry_name1',
		width: 100,
		render: (v) => renderCenter(v)
	}, {
		title: '主体评级',
		dataIndex: 'issuer_rating',
		key: 'issuer_rating',
		width: '5rem',
		render: (v) => renderCenter(v)
	},{
		title: '评级公司',
		dataIndex: 'rating_agency',
		key: 'rating_agency',
		width: '5rem',
		render: (value) => (
	        <div className="fix-width" style={{width:90}}>{value}</div>
	    )
	}
];

@observer
class PageListViewCmp extends React.Component {
	render() {
		let {renderRow,rowCmp,params} = this.props;
		return (
			<PageListView uri={'/issuer/list'} params={params} renderRow={renderRow} rowCmp={rowCmp} doFetch={true} offsetHeight={84}/>
		)
	}
};

@observer
class TableListViewCmp extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = {
		  doFetch:this.props.doFetch
	  };
	}
	componentWillReceiveProps(nextProps) {
		nextProps.doFetch !== this.props.doFetch && this.setState({doFetch:nextProps.doFetch})
	}
	onRowClick(record, index, event) {
        this.props.history.push(`/bond/detail?id=${record.wind_code}`);
	}
	render() {
		let {doFetch} = this.state;
		return (
			<TableListView
				uri="/bond/list"
				columns={columns}
				params={bondState.params}
				doFetch={true}
				onRowClick={this.onRowClick.bind(this)}
				height={CONTENT_HEIGHT-TABBAR_HEIGHT-NAV_HEIGHT-140} />
		)
	}
}

// @observer
export default class RateChange extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {
				list: []
			},
			index: 1,
			params: {},
			params1: {},
			doFetch: true,
			visible: false
		};
	}
	renderRow ({item,rowID}){
		return <BondItem item={item} key={rowID} />;
	}
	toResults(v) {
		let {index,params1} = this.state;
		if (index == 1) {
			this.props.history.push(`/bond/change/results?keyword=${v}`);
		} else {
			let obj = {doFetch:true};
			bondState.setParams({keyword:v});
			if (v === '') {
				Object.assign(obj,{keyword:''});
			}
			this.setState(obj)
		}
	}
	componentWillUnmount() {
		issuerState.resetParams();
		bondState.resetParams();
	}
	onChange(keyword) {
		this.setState({keyword,doFetch:false})
	}
	callback(index) {
		if (index !== this.state.index) {
			this.setState({index,onClose:true})
		}
	}
	onSubmit(params) {
		this.setState({params})
	}
	onClick(index) {
		if (index == 1) {
			bondState.resetParams();
		} else if (index == 2){
			issuerState.resetParams();
		}

	}
	render() {
		console.log('params',this.state.params);
		let {data: {list}, index,params1,keyword,doFetch,onClose,params} = this.state;

		return (
			<div className="rate-change-wrapper" style={{position:'fixed',top:44,left:0,right:0,bottom:0}}>
				<Tabs defaultActiveKey="1" swipeable={false} onChange={this.callback.bind(this)} onTabClick={this.onClick.bind(this)}>
					<TabPane tab="主体调整" key="1">
						<SearchBar placeholder="请输入关键字搜索" focused={this.state.focused} onSubmit={value => this.toResults(value)}/>
						<FilterBar1 onSubmit={this.onSubmit.bind(this)}>
							<SelectList data = {RateChangeList} mobxState={issuerState} name="变动" />,
							<RateSelect data = {RATE_LIST} mobxState={issuerState} middleBtn={true} wrapper={true} name="评级"/>,
							<CitySelect mobxState={issuerState} wrapper={true} leftBtnText="恢复至全国" name="地区"/>,
							<SelectList data = {DATE_LIST} mobxState={issuerState} name="日期" />
						</FilterBar1>
						<WhiteSpace size="xl" />
						<PageListViewCmp renderRow={this.renderRow} rowCmp={BondItem} params={params} />
					</TabPane>
					<TabPane tab="债项调整" key="2">
						<SearchBar placeholder="请输入关键字搜索" focused={this.state.focused} onSubmit={value => this.toResults(value)} value={keyword} onChange={this.onChange.bind(this)} onCancel={()=> this.toResults('')}/>
						<FilterBar1 onSubmit={this.onSubmit.bind(this)}>
							<SelectList data = {BondRateList} mobxState={bondState} name="变动"/>,
							<RateSelect data = {RATE_LIST} mobxState={bondState} middleBtn={true} wrapper={true} name="评级"/>,
							<BondSelect hideTitle={true} mobxState={bondState} name="类型"/>,
							<SelectList data = {DATE_LIST} mobxState={bondState} name="日期"/>
						</FilterBar1>
						<TableListViewCmp doFetch={doFetch} history={this.props.history}/>
					</TabPane>
				</Tabs>
				{index == 2 ? <Mask history={this.props.history} showAni={index == 2}/> : null}
			</div>
		)
	}
}
