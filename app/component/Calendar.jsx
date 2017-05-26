/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/23/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/25/2017
 */

import React from 'react';
import '../static/css/calendar.scss';
import Month from './CalendarMonth.jsx';
import {WIDTH} from '../route/const';

const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];

export default class Calendar extends React.Component {
    constructor(props) {
      super(props);

      this.state = {};
    }
    render() {
        let style = WIDTH >= 400 ? {style:WIDTH} : {};
        let {curYear,onMonthTap,data,history} = this.props;
        return (
            <div className="calendar-box">
                {
                    months.map((item)=>{
                        return (
                            <div key={item} className="calendar-item" style={style}>
                                <Month curYear={curYear} key={curYear + '-' + item} item={item} onMonthTap={onMonthTap} data={data} preventTouchEv={true} history={history}/>
                            </div>
                        )
                    })
                }

            </div>
        )
    }
}
