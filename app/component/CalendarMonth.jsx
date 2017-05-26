/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/26/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/26/2017
 */

import React from 'react';
import '../static/css/calendar.scss';
import moment from 'moment';
import {WIDTH,WEEK_LIST} from '../route/const';

const WEEK_DAYS = 7; // 每周天数

export default class CalendarMonth extends React.Component {
    constructor(props) {
        super(props);

        let {curYear,item} = this.props,
            selectedList = [];
        selectedList.length = moment(`${curYear}-${item}`, "YYYY-MM").daysInMonth();
        selectedList.fill(0);

        this.state = {
            selectedList,
            data:this.props.data
        };
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.data) !== JSON.stringify(this.state.data)) {
            this.setState({data:nextProps.data})
        }
    }
    onTouchTap() {
        let {onMonthTap} = this.props;
        onMonthTap && onMonthTap(this.props.item);
    }
    onTdTap(index) {
        if (__DEV__ && event.type === 'react-mouseup') return;
        if (this.props.preventTouchEv) return false;
        let {selectedList} = this.state,
            tmp = selectedList[index];
        selectedList.fill(0);
        selectedList[index] = tmp === 0 ? 1 : 0;
        this.setState({selectedList})
    }
    renderMonth() {
        console.log('renderMonth');
        let {curYear,curStyle,dotStyle,item} = this.props;
        let {selectedList,data} = this.state;
        let days = []; // 一个月所有天的集合
        let startIndex = 0; // 一个月第一天开始的index值，默认从周六开始

        let daysInMonth = moment(`${curYear}-${item}`, "YYYY-MM").daysInMonth(); // 一个月的天数
        let start = moment(`${curYear}-${item}-01`).day();
        let end = start + daysInMonth;
        let rows = 6;
        let total = rows * WEEK_DAYS;

        let rowsArr = [];

        let eleArry = [];

        for (let i = 0;i < rows;i++) {
            let colsArr = [];
            for (let j = 0; j < WEEK_DAYS;j++) {
                let index0 = i * WEEK_DAYS + j,
                    index = index0 - start + 1;
                if (index0 >= start && index0 < end) {
                    let style = curStyle;
                    let innerTdEle = null;

                    // if(item === '09') debugger;
                    // safari上有兼容性问题，isSame跟chrome上返回的结果不一致
                    // let dotEle = data && Object.keys(data).filter((key)=> moment(key).isSame(moment([curYear,item-1,index]))).length ? <i className="line" style={dotStyle}></i> : <i className="line white"></i>; // 是否有待办事项
                    // let dotEle = data[[curYear,item,index > 9 ? index : '0' + index].join('-')] ? <i className="line" style={dotStyle}></i> : <i className="line white"></i>; // 是否有待办事项

                    if (selectedList[index - 1] === 1) {
                        innerTdEle = <div className="circle green"><span>{index}</span></div>
                    } else {
                        // innerTdEle = moment().isSame(moment([curYear,item-1,index]),'days') ? <div className={curStyle ? curStyle.type : ''} style={style}><span>{index}</span></div> : <div><span>{index}</span></div>; // 当天的判断
                        // innerTdEle = moment().format('YYYY-MM-DD') === [curYear,item,index].join('-') ? <div className={curStyle ? curStyle.type : 'circle red'} style={style}><span>{index}</span></div> : <div><span>{index}</span></div>; // 当天的判断

                        if (moment().format('YYYY-MM-DD') === [curYear,item,index].join('-')) {
                            innerTdEle = <div className={curStyle ? curStyle.type : 'circle empty'} style={style}><span>{index}</span></div>
                        } else {
                            innerTdEle = data && Object.keys(data).filter((key)=> moment(key).isSame(moment([curYear,item-1,index]))).length ? <div className={'circle red'}><span>{index}</span></div>: <div><span>{index}</span></div>;
                        }
                    }

                    colsArr.push(
                        <td key={`${curYear}-${item}-${index}`} onTouchTap={this.onTdTap.bind(this,index - 1)}>
                            {innerTdEle}
                        </td>
                    );

                    selectedList.push(0);
                } else {
                    colsArr.push(<td key={index}><div></div></td>);
                }
            }

            rowsArr.push(<tr key={i}>{colsArr}</tr>)
        }


        return rowsArr;
    }
    render() {
        let {item,showWeekTitle,className,showMonthTitle,curStyle} = this.props;
        showMonthTitle = typeof(showMonthTitle) === 'undefined' ? true : showMonthTitle;
        return (
            <table cellSpacing="0" onTouchTap={this.onTouchTap.bind(this)} className={className}>
                {showMonthTitle ?
                    <thead>
                        <tr>
                            <td colSpan="7">{item}月</td>
                        </tr>
                    </thead> : null}
                <tbody>
                    {showWeekTitle ? <tr>{WEEK_LIST.map((item)=>(<td key={item}>{item}</td>))}</tr> : null}
                    {this.renderMonth(item)}
                </tbody>
            </table>
        )
    }
}
