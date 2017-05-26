/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/06/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/19/2017
*/

import React from 'react';
import {Link} from 'react-router-dom';
import '../static/css/bond-item.scss';

const NewBondItem =({item,rowID}) => (
    <Link className="bond-item new-bond-item" key={rowID} to={"/company1/newbond-detail?id=" + item.id} >
        <div className="bond-header">
            {item.bond_name}
        </div>
        <div style={{padding:'10px 0'}}>
            {item.issuer_type ? <span className="tag">{item.issuer_type}</span> : null}
            {item.current_rating ? <span className="tag red">{item.issuer_rating || '--'}/{item.current_rating || '--'}</span> : null}
        </div>
        <div className="bond-body">
            <div className="bond-body-left">
                <div className="bond-body-left-inner">
                    <div className="bond-rate">{item.coupon_rate_min}% ~ {item.coupon_rate_max}%</div>
                    <span className="bond-title">预期收益</span>
                </div>
            </div>
            <div className="bond-body-right">
                <div className="bond-rate">{item.term_and_special}</div>
                <span className="bond-title">期限</span>
            </div>
        </div>
        <div className="bond-footer">
            <span style={{paddingRight:10}}>{item.issuer_name}</span>
        </div>
    </Link>
);

export default NewBondItem;
