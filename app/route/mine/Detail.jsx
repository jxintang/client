/**
 * @Author: tangjingxin <jxintang>
 * @Date:   03/20/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/02/2017
 */

import React from 'react';
import {
	List
} from 'antd-mobile';
import 'static/css/me.scss';
import {get} from 'logics/rpc';

const Item = List.Item;

export default class MeDetail extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = {data:null};
	}
	componentWillMount() {
		this.fetch();
	}
	async fetch() {
		var data = await get('/me/info',{method:'POST'});
        this.setState({data});
	}
    render () {
		if (this.state.data === null) return null;
		let {info,wxinfo} = this.state.data;
        return (
            <div className="me-detail">
                <i className="head" style={{marginBottom:15,backgroundImage:`url(${wxinfo.headimgurl})`,borderRadius:22}} ></i>
                <h6 className="nick-name">{wxinfo.nickname}</h6>
                <List>
                    <Item extra={info.name}>姓名</Item>
                    <Item extra={info.org} wrap={true}>公司</Item>
                    <Item extra={info.department}>部门</Item>
                    <Item extra={info.title}>职位</Item>
                    <Item extra={info.phone}>手机</Item>
                    <Item extra={info.email}>邮箱</Item>
                    <Item extra={info.wx_phone}>微信绑定手机号</Item>
                    <Item extra={info.landline}>座机</Item>
                </List>
            </div>
        )
    }
}
