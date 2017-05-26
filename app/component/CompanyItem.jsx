/**
 * @Author: tangjingxin <tangduck>
 * @Date:   05/15/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/25/2017
*/

import React from 'react';
import RowTable from 'component/RowTable.jsx';
import {Link} from 'react-router-dom';
import '../static/css/company.scss';
import {formatLargeMount} from 'logics/rpc';

const rows = [
	{
        title:'法定代表人：',
        key:'chairman'
    },
    {
        title:'注册资本：',
        key:'reg_capital',
		render:(v)=>{
			return formatLargeMount(v);
		}
    },
    {
        title:'成立时间：',
        key:'found_date'
    }
];

const CompanyItem =({item,rowID}) => (
	<Link className="company-item" key={rowID} to={"/company1/detail?id=" + item.id} >
        <div className="company-head">
            <div className="left">{item.company_name}</div>
            <div className="right"><span className="area-tag">{item.city}</span></div>
        </div>
        <div className="company-body">
            <RowTable className="row-table-company" rows={rows} data={item} />
        </div>
	</Link>
);

export default CompanyItem;
