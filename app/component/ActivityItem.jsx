/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/06/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/24/2017
*/

import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import 'static/css/bond-item.scss';
import RowTable from './RowTable.jsx';

const rows = [
    {
        title:'活动时间：',
        key:'begin_time',
        key1:'end_time',
        render: (name,name1)=> {
            return (
                <div className="rating-range">{moment(name).format('YYYY-MM-DD')}至{moment(name1).format('YYYY-MM-DD')}</div>
            )
        }
    },
    {
        title:'活动地点：',
        key:'location'
    }
];

const statusList = {
    '进行中': 'activity-processing-icon',
    '报名中': 'activity-prepared-icon',
    '已结束': 'activity-finished-icon',
    '未开始报名': 'activity-not-started-icon'
}

const ActivityItem =({item,rowID}) => (
    <Link className="bond-item activity-item" key={rowID} to={"/company1/activity-detail?id=" + item.id} >
        <i className={"tag " + statusList[item.status]}></i>
        <div className="bond-header">
            {item.name}
        </div>
        <div className="bond-body">
            <RowTable className="row-table-activity" rows={rows} data={item} />
        </div>
        <div className="bond-footer">
            组织机构：{item.host_org}
        </div>
    </Link>
);

export default ActivityItem;
