/**
 * @Author: tangjingxin <jxintang>
 * @Date:   03/20/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/19/2017
*/

import React from 'react';
import {browserHistory} from 'react-router';
import {Link } from 'react-router-dom';
import {
   SearchBar,
   WhiteSpace,
   Button,
   Carousel
} from 'antd-mobile';
import 'static/css/results.scss';
import 'static/css/find-creditor.scss';
import {get} from 'logics/rpc';
import PageListView from 'logics/PageListView.jsx';
import BondTableItem from 'component/BondTableItem.jsx';
// import LikeCmp from 'component/LikeCmp.jsx';

export default class Results extends React.Component {
   constructor(props) {
       super(props);
       this.params = {};
       let str = this.props.location.search.substr(1);
       this.state = {
           keyword: str ? decodeURI(str.split('=')[1]) : '',
           doFetch: true,
           guess: null
       };
   }
   componentWillMount() {
       this.fetch();
   }
   async fetch() {
       var data = await get('/zhao/guess');
       this.setState({guess:data.guess})
   }
   onSubmit(keyword) {
       this.props.history.push('/bond/results',{keyword});
   }
   onChange(keyword) {
       this.setState({ keyword,doFetch:false});
   }
    render() {
       let {keyword,doFetch,guess} = this.state;
        return (
            <div style={{position: 'fixed',top: 44, left: 0, right: 0, bottom: 0}}>
                <SearchBar value={keyword} onSubmit={this.onSubmit.bind(this)} onChange={this.onChange.bind(this)} placeholder="请输入关键字搜索"/>
                <div style={{backgroundColor:'#F7F7F7'}}>
                    <WhiteSpace />
                    <div className="filter-card">
                        <div className="content">根据地域或发行时间查找债券？</div>
                        <div className="search-btn" onTouchTap={()=> {this.props.history.push('/bond/results',{more:true})}}>
                           搜索债券
                        </div>
                    </div>
                    <div style={{color:'#999',fontSize:14,padding:'10px 15px 5px'}}>近期发行的部分信用债</div>
                </div>
                <PageListView uri={'/zhao/default'} params={{keyword}} rowCmp={BondTableItem} doFetch={doFetch}/>
            </div>
        )
    }
}
