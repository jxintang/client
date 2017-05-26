/**
 * @Author: tangjingxin <jxintang>
 * @Date:   03/20/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/15/2017
 */

import React from 'react';
import {Link} from 'react-router-dom';
import {
	List,
	Button,
	Badge,
	Toast,
	Modal
} from 'antd-mobile';
import {get} from 'logics/rpc';
import 'static/css/me.scss';
import {WIDTH} from '../const';
import AuthCard from '../mine/AuthCard.jsx';

const alert = Modal.alert;
const Item = List.Item;

export default class MeList extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = {data:null};
	  this.files = null;
	}
	componentWillMount() {
		this.fetch();
	}
	async fetch() {
		var data = await get('/me/info',{method:'POST'});
        this.setState({data,uri:data && data.info && data.info.card_imgurl ? data.info.card_imgurl : this.state.uri});
	}
	async unbind() {
		let data = await get('/me/secure_phone/unbind');
		Toast.info('退出成功', 1);
		this.props.history.replace('/auth/login');
	}
    render() {
		if (this.state.data === null) return null;
		let {data:{info,wxinfo},loading,uri} = this.state;
		let {is_auth,auth_id,card_imgurl,reject_reason} = info;

		if (is_auth === true) {
			return (
	            <div className="me-wrapper">
	                <div className="info-wrapper">
	                    <List>
	                        <Item arrow="horizontal" extra={<Badge text={'已认证'} style={{ marginLeft: 12 }} />} thumb={wxinfo.headimgurl} multipleLine onClick={() => {this.props.history.push('/mine/detail')}}>{wxinfo.nickname}</Item>
	                    </List>
	                    {info && <div className="card-box">
	                        <table className="top">
	                            <tbody>
	                                <tr>
	                                    <td>
	                                        <h3>{info.name}</h3>
	                                        <span>{info.title}</span>
	                                    </td>
	                                    <td>
	                                        <i className="zhai-logo"></i>
	                                    </td>
	                                </tr>
	                            </tbody>
	                        </table>
	                        <div className="seperator"></div>
	                        <table className="bottom">
	                            <tbody>
	                                <tr>
	                                    <td>{info.org}</td>
	                                    <td>{info.phone}</td>
	                                </tr>
	                                <tr>
	                                    <td>{info.department}</td>
	                                    <td>{info.email}</td>
	                                </tr>
	                            </tbody>
	                        </table>
	                    </div>}
	                </div>
	                <List>
						<Item arrow="horizontal" onTouchTap={()=> {this.props.history.push('/mine/creditor-list')}}><span style={{color:'#AD2323'}}>我的债券</span></Item>
						<Item arrow="horizontal" onTouchTap={()=> {this.props.history.push('/setting/calendar?uri=/mybond/calendar')}}><span style={{color:'#AD2323'}}>我的日历</span></Item>
	                    <Item arrow="horizontal" onTouchTap={()=> {event.preventDefault();this.props.history.push('/mine/auth-card')}}>重新认证</Item>
	                    <Item arrow="horizontal" onTouchTap={()=> {this.props.history.push('/setting/notifications')}}>消息提醒设置</Item>
	                    <Item arrow="horizontal" onTouchTap={()=> {this.props.history.push('/mine/change-phone')}}>修改绑定手机号</Item>
	                    <Item arrow="horizontal" onTouchTap={() => alert('确认退出','确定要退出当前登录么?', [
					      { text: '取消', onPress: () => console.log('cancel') },
					      { text: '确定', onPress: () => this.unbind()},
					    ])}>退出当前账号</Item>
						<Item arrow="horizontal" onTouchTap={()=> {this.props.history.push('/mine/feedback')}}>咨询客服</Item>
	                </List>
	            </div>
	        )
		} else {
			return <AuthCard info={info} uri={uri} location={this.props.location} data={this.state.data} history={this.props.history}/>
		}
    }
}
