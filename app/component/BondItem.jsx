/**
 * @Author: tangjingxin <jxintang>
 * @Date:   03/02/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/18/2017
 */

import React from 'react';
import {Link} from 'react-router-dom';
import '../static/css/bond-item.scss';

const classMap = {
    "调高": "up",
    "维持": "hold",
    "调低": "down",
    "正面": "up",
    "稳定": "hold",
    "观望": "hold",
    "负面": "down",
    "待决": "hold"
}

const BondItem =({item,rowID}) => (
    <div className="bond-item" key={rowID} >
        <div className="bond-header">
            {item.company_name}
        </div>
        <div className="bond-body">
            <div className="bond-body-left">
                <div className="bond-badge">
                    <div className="badge-head">最新主体评级/评级展望</div>
                    <span className="badge-rank">{item.current_rating}</span>
                    {item.rating_change ? <span className={"badge-trend " + classMap[item.rating_change]}>{item.rating_change}</span> : '--'}
                    <span style={{padding:2}}>/</span>
                    {item.rating_outlook ? <span className={"badge-trend " + classMap[item.rating_outlook]}>{item.rating_outlook}</span> : '--'}
                </div>
            </div>
            <div className="bond-body-right">
                <div>最新评级日期：<span className="date-box">{item.current_rating_date || '--'}</span></div>
                <div style={{marginTop:8}}>上次评级日期：<span className="date-box">{item.previous_rating_date || '--'}</span></div>
            </div>
            <p>评级机构：{item.rating_agency}</p>
        </div>
        <div className="bond-footer">
            <Link to={"/bond/change/results-by-id?id=" + item.id}>查看相关债券></Link>
        </div>
    </div>
);

export default BondItem;
