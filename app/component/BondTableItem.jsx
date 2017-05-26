/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/14/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/24/2017
*/

import React from 'react';
import {Link} from 'react-router-dom';
import {
   Button,
   Toast
} from 'antd-mobile';
import {get} from 'logics/rpc';
import 'static/css/bond-table-item.scss';

export default class RowTable extends React.Component {
    constructor(props) {
	  super(props);

	  this.state = {
		  followList:[], // followList,存储id
          isFollow:this.props.item.is_follow
	  };
	}
    async followToggle(id,e) {
		e && e.preventDefault();
		let {followList} = this.state;
		var data = await get('/bond_follow/toggle',{method:'POST',body:{bond_id:id}});
		this.setState({isFollow:data.is_follow});
 		if (data.is_follow) {
			followList.push(id);
		} else {
			followList = followList.filter((item) => item !== id);
		}
		this.setState({followList})
        typeof(data.is_follow) !== 'undefined' && Toast.info(data.is_follow ? '关注成功' : '取消关注成功', 1);
	}
    componentWillReceiveProps(nextProps) {
        let {is_follow} = nextProps.item;
        if (is_follow !== this.state.isFollow) {
            this.setState({isFollow:is_follow});
        }
    }
    render() {
        let {isFollow} = this.state;
        let {item} = this.props;
        return (
            <Link className="bond-table-item" key={item.wind_code} to={`/bond/detail?id=${item.wind_code}`}>
                <div className="result-item-row">
                    <table>
                        <tbody>
                            <tr>
                                <td>简称：</td>
                                <td>{item.abbrev_name}</td>
                            </tr>
                            <tr>
                                <td>债券期限：</td>
                                <td>{item.term_in_year}年{item.special_term?`(${item.special_term})`:''}</td>
                            </tr>
                            <tr>
                                <td>发行总额：</td>
                                <td>{item.issue_actual_amount ? item.issue_actual_amount + '亿' : ''}</td>
                            </tr>
                            <tr>
                                <td>发行日期：</td>
                                <td>{item.issue_start_date}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="fr">
                        <Button size="small" inline className="follow-btn" onTouchTap={this.followToggle.bind(this,item.id)}>{isFollow ? '取消关注' : '关注'}</Button>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </Link>
        )
    }
}
