/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/21/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/17/2017
 */

import React from 'react';
import 'static/css/slider-item.scss';
import 'static/css/creditor-valuation.scss';
import ValuationItem from 'component/ValuationItem.jsx';
import { WhiteSpace, Tabs } from 'antd-mobile';
import PageListView from 'component/PageListView1.jsx';
import Fetcher from 'component/Fetcher.jsx';

const TabPane = Tabs.TabPane;

const TabList = [
	"企业债",
	"公司债",
  "中短期票据",
	"国开债",
	"国债"
];

class Header extends React.Component {
	render () {
		let {data} = this.props;
		if (data === null) return null;
		return (
			<div className="header">
				<div>数据更新时间：<span>{data.max_date}</span></div>
				<div style={{padding:5}}>数据来源：<span>{data.source}</span></div>
			</div>
		)
	}
}

export default class creditorValuation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			currentTab: TabList[0]
        };
	}
	callback(index) {
		this.setState({currentTab:TabList[index]})
	}
	render() {
        let {currentTab} = this.state;
		return (
			<div style={{backgroundColor:'#F7F7F7',position:'fixed',top:44,left:0,right:0,bottom:0}} className="wrapper0">
				<Tabs defaultActiveKey="0" swipeable={false} onChange={this.callback.bind(this)} destroyInactiveTabPane={true}>
					{
						TabList.map((item,index)=>(
							<TabPane tab = {item} key = {index}>
								<div className="creditor-valuation-wrapper">
									<Fetcher uri="/cbond/list-by-name" params={{name:currentTab}}>
										<Header />
										<PageListView  rowCmp={ValuationItem} offsetHeight={70}/>
									</Fetcher>
								</div>
							</TabPane>
						))
					}
				</Tabs >
				<WhiteSpace/>
			</div>
		)
	}
}
