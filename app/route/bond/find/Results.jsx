/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/05/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/02/2017
 */

import React from 'react';
import {Popup,SearchBar} from 'antd-mobile';
import { observer } from 'mobx-react';
import 'static/css/creditor-results.scss';
import MutiFilter from 'component/MutiFilter';
import RowTable from 'component/RowTable';
import bondState from 'mobx-state/BondState';
// import PageListView from 'logics/PageListView.jsx';
import PageListView from 'component/PageListView1.jsx';
import Fetcher from 'component/Fetcher.jsx';
import ResultItem from 'component/ResultItem.jsx';
import {get} from 'logics/rpc';
import {CONTENT_HEIGHT,TABBAR_HEIGHT,NAV_HEIGHT} from '../../const';

const showPopup = () => {
	event && event.preventDefault(); // 修复 Android 上点击穿透
	Popup.show(
		<MutiFilter onClose={() => Popup.hide()} mobxState={bondState} height={CONTENT_HEIGHT - TABBAR_HEIGHT - NAV_HEIGHT - 44}/>);
}

const rows = [
    {
        title:'地区：',
        key:'city_list',
        key1:'city_list',
        render: (name)=> {
            return (
                <div className="area-list">{name}</div>
            )
        }
    },
    {
        title:'发行时间：',
        key:'date'
    },
];

const range_short_cn = {
    '1weeks':'一周内',
    '2weeks':'两周内',
    '1days':'当天',
    '1months':'一个月内',
    '3months':'三个月内'
}

class Detail extends React.Component {
	render() {
		let {data} = this.props;
		if (data === null) return null;
		return (
			<div className="search-box">
				<div className="search-foot">
					<div style={{marginBottom:10}}>查找到{data.issuer_cnt}家发行人，共计{data.bond_cnt}只债券</div>
					<button className="search-btn" onTouchTap={(e)=>{showPopup(e)}}>重新筛选</button>
				</div>
			</div>
		)
	}
}

@observer
export default class FindResults extends React.Component {
    constructor(props) {
      super(props);

	  let {location:{state}} = this.props.history;

      this.state = {
		  keyword:state && state.keyword||'',
          data:null
      };
    }
    componentDidMount() {
		let {location:{state},action} = this.props.history;
        if (state && state.more && action === 'PUSH') {
            showPopup();
        }
    }
	onChange(keyword) {
		this.setState({keyword})
	}
    onSubmit(keyword) {
        this.refs.fetcher.fetch(true,{keyword, ...bondState.params});
		if (keyword === '') {
			this.setState({keyword});
		}
 	}
    render() {
        let {doFetch,keyword,data} = this.state;
        let {params:{province_list,city_list,range_short,range_begin,range_end}} = bondState;
		let rows1 = rows.concat([]);
        let bond = {
            city_list:(province_list || []).concat(city_list).join('、') || [],
            date:range_short_cn[range_short] || (range_begin && range_end ? `${range_begin} 至 ${range_end}` : '')
        }

		if (bond.city_list.length === 0) rows1.shift();
		if (bond.date === '') rows1.pop();

        return (
            <div className="creditor-results" style={{position:'fixed',top:44,left:0,right:0,bottom:0}}>
                <SearchBar value={keyword} onChange={this.onChange.bind(this)} onSubmit={this.onSubmit.bind(this)} onCancel={this.onSubmit.bind(this,'')} placeholder="请输入关键字搜索"/>
                {rows1.length ?
					<div className="search-box">
	                    <div className="search-head">
	                        <RowTable rows={rows1} data={bond} />
	                    </div>
	                </div>  : null}
				<Fetcher uri="/zhao/list" mobxState={bondState} ref="fetcher" params={{keyword}}>
					<Detail />
                	<PageListView  rowCmp={ResultItem} offsetHeight={bond.city_list.length || bond.date ? 175 : 95}/>
				</Fetcher>
			</div>
        )
    }
}
