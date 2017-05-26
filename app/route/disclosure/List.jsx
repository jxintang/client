/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/19/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/10/2017
*/

import React from 'react';
import {
	List,
    Switch,
    WhiteSpace
} from 'antd-mobile';
import {get} from 'logics/rpc';
import 'static/css/info.scss';

const Item = List.Item;

export default class InfoDisclosure extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = {
		  data: null
	  };
	}
	componentWillMount() {
		this.fetch();
	}
	async fetch() {
		let data = await get('/disclosure/group_list');
		this.setState({data});
	}
	goSetting() {
		this.props.history.push('/setting/notifications')
	}
    render() {
		if (this.state.data === null) return null;
		let {data:{group_list}} = this.state;

        return (
			<div>
				<WhiteSpace />

				{group_list.map((item,index)=> (
					<List renderHeader={() => item.name.replace('债券产品','')} key={item.name}>
						{item.category_list.map((regular)=>(
							<Item arrow="horizontal" key={regular} onClick={()=> {event.preventDefault();this.props.history.push(`/disclosure/item-list?category=${regular}&item_name=${regular}`)}}>{regular}</Item>
						))}
					</List>
				))}

				<div style={{marginTop:20,paddingLeft:15,color:'#4F4F4F',backgroundColor:'#fff'}}>
					<div style={{paddingTop:12,paddingBottom:12,fontSize:14,borderBottom:'1px solid #DEDEDE'}}>温馨提示</div>
					<p style={{fontSize:12,margin:0,lineHeight:'2em',padding:12,paddingLeft:0}}>为了更好的帮助您管理存续期债券。您可以在"消息提醒设置"中设定您关注债券的信息披露提醒时间</p>
				</div>
				<WhiteSpace size="lg" />
				<div className="middle-btn" onTouchTap={this.goSetting.bind(this)}>查看已设置提醒</div>
				<WhiteSpace size="xl" />
				<WhiteSpace size="xl" />
				<WhiteSpace size="xl" />
			</div>
        )
    }
}
