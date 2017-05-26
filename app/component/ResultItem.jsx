/**
 * @Author: tangjingxin <jxintang>
 * @Date:   03/10/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/24/2017
 */

import React from 'react';
import {
	WhiteSpace,
    Button,
	Toast
} from 'antd-mobile';
import {get} from '../logics/rpc';
import { Link } from 'react-router-dom';

export default class ResultItem extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = {
		  followList:[] // followList,存储id
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
    render () {
        let {item} = this.props;
		let {followList} = this.state;

        return (
            <div className="result-group">
                <div className="result-head">
                    <div className="tl"><span className="result-title">{item.company_name}</span></div>
                    <div className="tr">{item.province || item.city}</div>
                    <div className="bl">共找到{item.match_cnt || (item.items || item.bond_list || item.list).length}只债券</div>
                    <div className="br"><Link to={"/bond/change/results-by-id?id=" + item.id}>查看所有债券</Link></div>
					<WhiteSpace />
                    <div className="clearfix"></div>
                </div>
                {
                    (item.items || item.bond_list || item.list).map((data)=> (
                        <Link className="result-item" key={data.wind_code} to={`/bond/detail?id=${data.wind_code}`}>
                            <div className="result-item-row">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>简称：</td>
                                            <td>{data.abbrev_name}</td>
                                        </tr>
                                        <tr>
                                            <td>债券期限：</td>
                                            <td>{data.term_in_year}年{data.special_term?`(${data.special_term})`:''}</td>
                                        </tr>
										<tr>
                                            <td>发行总额：</td>
                                            <td>{data.issue_actual_amount ? data.issue_actual_amount + '亿' : ''}</td>
                                        </tr>
                                        <tr>
                                            <td>发行日期：</td>
                                            <td>{data.issue_start_date}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="fr">
                                    <Button size="small" inline className="follow-btn" onTouchTap={this.followToggle.bind(this,data.id)}>{followList.indexOf(data.id) > -1 ? '取消关注' : '关注'}</Button>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        )
    }
}
