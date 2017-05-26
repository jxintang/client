/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/23/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/18/2017
 */

import React from 'react';
import qs from 'query-string';
import {
	WhiteSpace,
	Toast
} from 'antd-mobile';
import 'static/css/results.scss';
import {get} from 'logics/rpc';
import BondTableItem from 'component/BondTableItem.jsx';
import PageListView from 'component/PageListView1.jsx';
import Fetcher from 'component/Fetcher.jsx';

class ResultHead extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = {follow:false};
	}
	async followAll(id) {
		var data = await get('/bond_follow/add-by-issuer-id',{method:'POST',body:{issuer_id:id}});
		this.setState({data,follow:true});
		data.ok && Toast.info('全部关注成功！', 1);
		this.props.fetch && this.props.fetch(true);
	}
	async delAll(id) {
		var data = await get('/bond_follow/del-by-issuer-id',{method:'POST',body:{issuer_id:id}});
		this.setState({data,follow:false});
		Toast.info('全部取消关注成功！', 1);
		this.props.fetch && this.props.fetch(true);
	}
	render() {
		let {data} = this.props;
		let {follow} = this.state;
		if (data === null || data.issuer === null) return null;
		return (
			<div className="result-head">
				<div className="tl"><span className="result-title">{data.issuer.company_name}</span></div>
				<div className="tr">{data.issuer.province || data.issuer.city}</div>
				<div className="bl">共发行<span style={{color:'#DD4D20'}}>{data.total_no_keyword}</span>只债券</div>
				<WhiteSpace />
				<div className="br" onTouchTap={this[follow ? 'delAll' : 'followAll'].bind(this,data.issuer.id)}>{follow ? '全部取消关注' : '全部关注'}</div>
				<div className="clearfix"></div>
			</div>
		)
	}
}

export default class Results extends React.Component {
 	constructor(props) {
 	  	super(props);
 		this.params = {};

        let query = qs.parse(this.props.location.search);
 	  	this.state = {
 			id: query.id
 		};
 	}
    render() {
 		let {id} = this.state;
        return (
             <div style={{paddingTop:15}} className="results-by-id">
                 <div className="result-group" >
				     <Fetcher uri="/issuer/by-id" params={{id}}>
					 	 <ResultHead />
					     <PageListView params={{id}} rowCmp={BondTableItem} />
				     </Fetcher>
                 </div>
             </div>
        )
     }
}
