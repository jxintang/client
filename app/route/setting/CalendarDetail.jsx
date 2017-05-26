/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/26/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/27/2017
 */

import React from 'react';
import qs from 'query-string';
import {Link} from 'react-router-dom';
import moment from 'moment';
import { Picker,Toast } from 'antd-mobile';
import {get} from 'logics/rpc';
import navState from 'mobx-state/NavState';
import Month from 'component/CalendarMonth.jsx';
import 'static/css/calendar-detail.scss';

// 当天的样式
const curStyle = {
    type:'circle empty',
    width: 22,
    color: '#666',
    backgroundColor: '#fff'
}

class CalendarBondItem extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          is_follow:this.props.item.bond.is_follow
      };
    }
    componentWillMount() {
        navState.addEventListener('/setting/calendar-detail',()=>{this.context.router.history.goBack()})
    }
    async setNotification(id) {
        event && event.preventDefault();
        let data = await get('/bond_follow/toggle', {body: {bond_id:id}});
        this.setState({is_follow:data.is_follow});
        typeof(data.is_follow) !== 'undefined' && Toast.info(data.is_follow ? '关注成功' : '取消关注成功', 1);
    }
    render() {
        let {item} = this.props;
        let {is_follow} = this.state;
        return (
            <Link className="bond-item" to={{pathname:'/bond/detail',search:`?id=${item.bond.id}`}}>
                <div className="bond-item-head">
                   <div className="bond-item-title">{item.bond ? item.bond.bond_name : ''}</div>
                   <div style={{float:'right',marginRight:15}}>
                       <span className="btn blue-btn" onTouchTap={this.setNotification.bind(this,item.bond.id)}>{is_follow ? '取消关注' : '关注'}</span>
                   </div>
                   <div style={{clear:'both'}}></div>
               </div>
               {item.item_list.map((item_list,index)=>(
                   <div className="bond-item-content" key={index}>
                      <div style={{marginBottom:10}}>事件：{item_list.name}</div>
                      <div>截止时间：{item_list.date}</div>
                   </div>
               ))}
            </Link>
        )
    }
}

CalendarBondItem.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default class CalendarDetail extends React.Component {
     constructor(props) {
       super(props);
       let {curYear,month,id,uri} = qs.parse(this.props.location.search);
       this.id = id;
       this.uri = uri;
       this.curYear = curYear;
       this.state = {
           curYear,
           month,
           data: null
       };
     }
     componentWillMount() {
         this.fetch();
     }
     async fetch() {
         let {uri,id,curYear} = this;
        if (this.uri) {
            let year = curYear || moment().year();
            let data = await get(uri, {
                body: id ? {id,year} : {year}
     		});
            this.setState({data});
        }
     }
     onMonthTap() {}
     goNotify() {
         this.props.history.push('/setting/notifications');;
     }
     render() {
         let {curYear,month,data} = this.state;
         if (data === null) return null;
         return (
             <div className="calendar-detail-wrapper">
                 <div className="calendar-detail">
                     <div className="calendar-detail-head">
                        {`${curYear}年${month}月`}
                     </div>
                     <Month
                        key={curYear + '-' + month}
                        data={data.calendar}
                        curYear={curYear}
                        item={month}
                        onMonthTap={this.onMonthTap}
                        className="calendar-month-table"
                        showWeekTitle={true}
                        showMonthTitle={false}
                        curStyle={curStyle} />
                 </div>
                 {Object.keys(data.calendar).map((key)=>{
                     if (moment(key).month() == parseInt(month) - 1) {
                         return data.calendar[key] instanceof Array && data.calendar[key].map((item,index)=>(
                             <CalendarBondItem item={item} key={item.bond_id} />
                         ))
                     }
                 })}
                 <div className="calendar-detail-bottom" onTouchTap={this.goNotify.bind(this)}>设置提醒规则</div>
             </div>
         )
     }
 }
