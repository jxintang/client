/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/23/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/26/2017
 */

import React from 'react';
import qs from 'query-string';
import {get} from 'logics/rpc';
import CalendarCmp from 'component/Calendar.jsx';
import { Carousel } from 'antd-mobile';
import {CONTENT_HEIGHT,NAV_HEIGHT} from '../const';
import moment from 'moment';

class CalendarPage extends React.Component {
    constructor(props) {
      super(props);
      let {curYear,data,item,id,uri} = this.props;
      this.id = id;
      this.uri = uri;
      this.state = {curYear,data,item};
    }
    componentWillReceiveProps(nextProps) {
        let {curYear,data,item} = nextProps;
        if (curYear !== this.state.curYear || (data && this.state.data === null && curYear == item)) {
            this.setState({curYear,data,item})
        }
    }
    goMonth(month) {
        this.props.history.push(`/setting/calendar-detail?curYear=${this.state.curYear}&month=${month}&uri=${this.uri}&id=${this.id}`)
    }
    render() {
        let {curYear,data} = this.state;
        let {item} = this.props;
        return (
            <div className="calendar-demo" style={{backgroundColor:'#fff',height:CONTENT_HEIGHT - NAV_HEIGHT}}>
               <div style={{marginLeft:15,color:'#666',padding:'5px 0',borderBottom:'1px solid #DEDEDE'}}>
                   <div style={{fontSize:18,display:'inline-block',width:'50%'}}>{item}</div>
                   <div style={{fontSize:12,display:'inline-block',width:'50%',textAlign:'right',lineHeight:'20px'}}>
                       <span style={{paddingRight:15}}>{curYear == item && data && data.calendar ? `共${data.calendar.total}个待办事项` : ''}</span>
                   </div>
               </div>
               <CalendarCmp curYear={item} onMonthTap={this.goMonth.bind(this)} data={curYear == item && data ? data.calendar : null} history={this.props.history}/>
           </div>
        )
    }
}


export default class Calendar extends React.Component {
    constructor(props) {
      super(props);

      let query = qs.parse(this.props.location.search);
      let curYear = moment().year();
      let yearList = [parseInt(curYear) - 1,parseInt(curYear),parseInt(curYear) + 1]; // 初始化最开始的三年，去年、今年、明年
	  this.id = query.id;
	  this.uri = query.uri;

      this.state = {
          curYear,
          data: null,
          yearList: [...yearList]
      };

      this.cacheEles = {};
      this.cacheDataEles = {};
      yearList.map((item)=>{this.cacheEles[item] = null;this.cacheDataEles[item] = null;});
    }
    componentWillMount() {
        this.fetch(this.state.curYear);
    }
    async fetch(year,to) {
        let {uri,id} = this;
        if (this.uri) {
            let data = await get(uri, {
              body: {id,year}
            });
            this.setState({data,curYear:year,yearList:typeof to !== 'undefined' ? this.changeYearList(to) : this.state.yearList});
        }
    }
    fetchData(from,to) {
        let {state:{curYear},cacheDataEles} = this;
        if (from === to) {
            return;
        } else if (to - from == 1 || to - from == -2) {
            curYear += 1;
        } else {
            curYear -= 1;
        }

        if (cacheDataEles[curYear]) {
            this.setState({
                yearList:this.changeYearList(to),
                curYear
            })
        } else if (typeof to !== 'undefined') {
            setTimeout(() => {
    			this.fetch(curYear,to);
    		},1000);
        }
    }
    changeYearList(index) {
        let {yearList} = this.state;
        if (index === 0) {
            yearList[2] = yearList[0] - 1;
            yearList[1] = yearList[0] + 1;
        } else if (index === 1) {
            yearList[0] = yearList[1] - 1;
            yearList[2] = yearList[1] + 1;
        } else if (index === 2) {
            yearList[0] = yearList[2] + 1;
            yearList[1] = yearList[2] - 1;
        }

        return yearList;
    }
    render() {
        let {curYear,data,yearList} = this.state;
        let YearListEle = [];
        let {cacheEles,cacheDataEles,id,uri} = this;
        let {history} = this.props;
        return (
            <Carousel
                className="my-carousel" autoplay={false} infinite selectedIndex={1} dots={false}
                beforeChange={(from, to) => {console.log('before',(new Date()).getTime());this.fetchData(from,to)}}>
                {
                    yearList.map((item)=>{
                        if (cacheDataEles[item]) {
                            return cacheDataEles[item];
                        } else if (cacheEles[item]) {
                            if (item == curYear) {
                                let ele = cacheEles[item];
                                cacheDataEles[item] = React.createElement(ele.type,{...ele.props,data,curYear});
                                return cacheDataEles[item];
                            } else {
                                return cacheEles[item];
                            }

                        } else {
                            cacheEles[item] = <CalendarPage key={curYear + item} curYear={curYear} item={item} data={data} history={history} id={id} uri={uri}/>;
                            return cacheEles[item]
                        }
                    })
                }
            </Carousel>
        )
    }
}
