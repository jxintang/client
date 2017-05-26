/**
 * @Author: tangjingxin <jxintang>
 * @Date:   03/20/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/13/2017
 * 猜你喜欢模块
 */

import React from 'react';
import { Toast } from 'antd-mobile';
import '../static/css/like-item.scss';
import {get} from '../logics/rpc';

class LikeItem extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          isFollow:false
      };
    }
    async followToggle(id,e) {
		e && e.preventDefault();
		var data = await get('/bond_follow/toggle',{method:'POST',body:{bond_id:id}});
		this.setState({isFollow:data.is_follow});
        typeof(data.is_follow) !== 'undefined' && Toast.info(data.is_follow ? '关注成功' : '取消关注成功', 1);
	}
    render() {
        let {item} = this.props;
        let {isFollow} = this.state;
        return (
            <div className="like-item">
                <div className="like-item-content">
                    <div className="like-item-content-header">
                        {item.bond_name}
                    </div>
                    <div className="like-item-content-body">
                        <table>
                            <tbody>
                                <tr>
                                    <td>简称：{item.abbrev_name}</td>
                                    <td>代码：{item.wind_code}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2">发行人：{item.issuer_name}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="follow-btn" onTouchTap={this.followToggle.bind(this,item.id)}>{isFollow ? '取消关注' : '关注'}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LikeItem;
