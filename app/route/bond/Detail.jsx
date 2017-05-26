/**
 * @Author: tangjingxin <jxintang>
 * @Date:   03/20/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/26/2017
 */

import React from 'react';
import {Link} from 'react-router-dom';
import qs from 'query-string';
import {get} from 'logics/rpc';
import {
	List,
	Tabs,
	Toast
} from 'antd-mobile';
import RowTable from 'component/RowTable.jsx';
import WxConfig from 'component/WxConfig.jsx';
import 'static/css/creditor-detail.scss';
import navState from 'mobx-state/NavState';

const Item = List.Item;
const TabPane = Tabs.TabPane;

const rows = [
	{
        title:'发行人：',
        key:'issuer_name'
    },
    {
        title:'债券代码：',
        key:'wind_code'
    },
    {
        title:'债券简称：',
        key:'abbrev_name'
    },
    {
        title:'债券类型：',
        key:'industry_name2'
    },
    {
        title:'发行总额：',
        key:'issue_actual_amount',
		render: (name,name0)=> {
            return (
				<div>{name}亿</div>
			)
        }
    },
    {
        title:'发行日期：',
        key:'issue_start_date'
    },
];

const rows1 = [
    {
        title:'起息日期：',
        key:'carry_date'
    },
    {
        title:'到期日期：',
        key:'maturity_date'
    },
    {
      title:'票面利率：',
      key:'coupon_rate',
      render:(rate)=>(<div>{rate ? rate + '%' : '--'}</div>)
    },
  {
    title:'债券期限：',
    key:'term_in_year',
    key1:'special_term',
    render:(term, sterm)=>(<div>{term}年{sterm?`(${sterm})`:''}</div>)
  },
  {
        title:'含权特殊条款：',
        key:'special_condition'
    },
];

const rows2 = [
    {
        title:'主体评级：',
        key:'issuer_current_rating'
    },
    {
      title:'债项评级：',
      key:'current_rating'
    },
    {
        title:'评级机构：',
        key:'rating_agency',
    },
    {
        title:'增信方式：',
      	key:'guarantee',
    },
    {
        title:'主承销商：',
        key:'lead_agency',
    }
];

// 债券信息披露
class BondDisclosure extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = {
		  toggleList:this.props.toggleList
	  };
	}
	onToggle(index) {
		event && event.preventDefault();

		if (__DEV__ && event.type === 'react-mouseup') return; // 解决调试环境下的bug
		let {toggleList} = this.state,
			tmp = toggleList[index];
		toggleList.fill(0);
		toggleList[index] = tmp === 1 ? 0 : 1;
		this.setState({toggleList});
	}
	render() {
		let {data,id,category} = this.props;
		if (data === null) return null;
		let {regular,provisional} = data;
		let {toggleList} = this.state;
		return (
			<div className="info-detail">
				<div className="info-head">
					<div className="left">信息披露</div>
					<div className="right">
						<Link className="calendar" to={`/setting/calendar?id=${id}&uri=/zhao/calendar`}>
							<i className="calender-icon"></i>查看日历
						</Link>
					</div>
				</div>
				<Tabs defaultActiveKey="1" swipeable={false}>
					<TabPane tab="定期报告" key="1">
						<div className="tabpane">
							{regular && Object.keys(regular).map((item,index)=>(
								<div className="fixed-list" key={index}>
									<div className="fixed-item" onTouchTap={this.onToggle.bind(this,index)}>
										<div className="left">{item}</div>
										<div className="middle">{regular[item].date_title}</div>
										<div className={toggleList[index] === 1 ? 'rotate right' : 'right'}><i></i></div>
									</div>
									<div style={{paddingRight:15}}>
										{toggleList[index] === 1 ? regular[item].content ?
											<div className="fixed-table" key={index}>
												<div className="fixed-table-content" style={{padding:10}}>{regular[item].content}</div>
												<Link className="fixed-table-more" to={`/content/view?title=${item}&params=${JSON.stringify({category,item_name:regular[item].name})}&uri=/disclosure/regular/item`}>查看具体规则</Link>
											</div>
											: Object.keys(regular[item].items).map((index)=>(
											<div className="fixed-table" key={index}>
												<div className="fixed-table-head">{index == 'o' ? '' : index}工作</div>
												{regular[item].items[index].map((arr,index)=>(
													<div className="fixed-table-content" key={index}>
														<div className="fixed-table-content-left">{arr[0]}</div>
														<div className="fixed-table-content-right">{arr[1]}</div>
													</div>
												))}
												<Link className="fixed-table-more" to={`/content/view?title=${item}&params=${JSON.stringify({category,item_name:regular[item].name})}&uri=/disclosure/regular/item`}>查看具体规则</Link>
											</div>
										)) : null}
									</div>
								</div>
							))}
						</div>
					</TabPane>
					<TabPane tab="临时报告" key="2">
						<div className="tabpane">
							{provisional.map((item)=>(
								<div className="section" key={item.id}>
									{item.name}
									<ul>
										<li className="section-half">
											<Link to={`/content/view?title=${item.name}&params=${JSON.stringify({id:item.id})}&uri=/disclosure/provisional/get-by-id`}>查看具体内容</Link>
										</li>
									</ul>
								</div>
							))}
						</div>
					</TabPane>
				</Tabs>
			</div>
		)
	}
}

function ALink({link, children}){
	if(link.direct_link){
		return (<a href={link.source_url}>{children}</a>)
	}else{
		return (
			<Link  to={{
				  pathname: '/news/content-detail',
				  search: `?id=${link.id}`,
				  state: { fromDashboard: true }
			  }}>{children}</Link>
		)
	}
}

export default class BondDetail extends React.Component {
	constructor(props) {
	  super(props);

	  let query = qs.parse(this.props.location.search);
	  this.id = query.id || '';
	  this.state = {
		  data: null,
		  toggleList: []
	  };
	}
    componentWillMount() {
		navState.addEventListener('/bond/detail',(e)=>{this.followToggle(this.id,true)});
		this.fetch({id:this.id});
		this.fetchNews();
    }
	async fetch(params) {
		let toggleList = [];
		let data = await get('/zhao/bond', {
			method: 'POST',
			body: params
		});

		let {disclosure} = data;

		if (disclosure && disclosure.regular) {
			toggleList.length = Object.keys(disclosure.regular).length;
			toggleList.fill(0);
		}

		navState.addState('/bond/detail',data.bond.is_follow ? 1 : 0);
		this.setState({data,toggleList,isFollow:data.cross_market ? data.cross_market.is_follow : false});
    await WxConfig.share({title:data.bond.bond_name});
	}
	async fetchNews() {
		let data = await get('/content/news',{body:{limit:3}});
		this.setState({news:data});
	}
	callback() {

    }
	componentWillReceiveProps(nextProps) {
		let query = qs.parse(nextProps.location.search);
		if (query && query.id !== this.id) {
			this.id = query.id;
			this.fetch({id:this.id});
		}
	}
	async followToggle(id,isCur) {
		if (__DEV__ && event.type === 'react-mouseup') return; // 解决调试环境下的bug
		console.log('lll');
		event && event.preventDefault();
		var data = await get('/bond_follow/toggle',{method:'POST',body:{bond_id:id}});
		if (isCur) {
			navState.addState('/bond/detail',data.is_follow ? 1 : 0);
		} else {
			this.setState({isFollow:data.is_follow});
		}
        typeof(data.is_follow) !== 'undefined' && Toast.info(data.is_follow ? '关注成功' : '取消关注成功', 1);
	}
    render() {
		if (this.state.data == null) return null;
		let {data:{bond,issuer,cross_market,disclosure},toggleList,isFollow,news} = this.state;
        return (
            <div className="creditor-detail">
                <div className="bond-detail">
                    <div className="bond-head">
                        <span>{bond.bond_name}</span>
                    </div>
                    <Tabs defaultActiveKey="1" swipeable={true} onChange={this.callback.bind(this)}>
                        <TabPane tab="债券简介" key="1">
                            <div className="tabpane">
                                <RowTable className="row-table-intro" rows={rows} data={bond} />
                            </div>
                        </TabPane>
                        <TabPane tab="利率期限" key="2">
                            <div className="tabpane">
                                <RowTable className="row-table-rate" rows={rows1} data={bond} />
                            </div>
                        </TabPane>
                        <TabPane tab="评级担保" key="3">
                            <div className="tabpane">
                                <RowTable className="row-table-gur" rows={rows2} data={Object.assign({},issuer,bond,{issuer_current_rating:issuer.current_rating,issuer_previous_rating:issuer.previous_rating, guarantee:bond.guar_type&&bond.guarantor?`${bond.guar_type}(${bond.guarantor})` : bond.guar_type || `--`})} />
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
				{cross_market ?
					<div className="info-detail">
	                    <div className="info-head">
	                        <div className="left">跨市场关联债</div>
	                        <div className="right"><Link to={{pathname:'/bond/detail',search:`?id=${cross_market.id}`}} style={{color:'#36AFEF'}}>查看详情</Link></div>
	                    </div>

						<div className="cross-market">
							<i className="market-tag"></i>
							<Link to={{pathname:'/bond/detail',search:`?id=${cross_market.id}`}} style={{color:'#36AFEF'}}>
								<table>
									<tbody>
										<tr>
											<td>债券代码：{cross_market.wind_code}</td>
											<td rowSpan="2"><span className="follow-btn" onTouchTap={this.followToggle.bind(this,cross_market.wind_code)}>{isFollow ? '取消关注' : '一键关注'}</span></td>
										</tr>
										<tr>
											<td>债券简称：{cross_market.abbrev_name}</td>
										</tr>
									</tbody>
								</table>
							</Link>
						</div>
					</div>
				: null}
				<BondDisclosure data={disclosure} toggleList={toggleList} id={this.id} category={bond.disclosure_category}/>
				{
					news && news.list && news.list.length
						? <div className="info-detail">
		                    <div className="info-head">
		                        <div className="left">新闻资讯</div>
		                    </div>
							<List className="my-list">
								{ news.list.splice(0,3).map((item,index)=>(
									<Item key={index}>
										<ALink link={item} >
											<div className="list-head">{item.title}</div>
											<span className="list-agency">{item.source_name}</span>
											<span className="list-date">{item.publish_time.substr(0,10)}</span>
										</ALink>
									</Item>
								))}
							</List>
							{ news.total > 3 ? <a className="view-more" onTouchTap={()=>this.props.history.push('/news/info')}>查看更多</a> : null}
						 </div>
						: null
				}
            </div>
        )
    }
}
