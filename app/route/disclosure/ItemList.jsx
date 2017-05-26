/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/19/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/25/2017
*/

import React from 'react';
import qs from 'query-string';
import {
	List,
    WhiteSpace
} from 'antd-mobile';

import navState from 'mobx-state/NavState';
import 'static/css/info.scss';

const Item = List.Item;


export default class ItemList extends React.Component {
	constructor(props) {
	  	super(props);
		let query = qs.parse(this.props.location.search);
		console.log(query.category);
		this.category = query.category || '';
	  	this.state = {};
	}
	componentWillMount() {
		navState.addNavTitle('/disclosure/item-list',this.category);
	}
	onClick = (url,category)=> {
		event.preventDefault();
		if (__DEV__ && event.type.indexOf('mouseup') > -1) return;
		this.props.history.push(url + this.props.location.search);
	}
    render() {
		let {category} = this;
		let {history} = this.props;
        return (
        	<div>
                <WhiteSpace size="lg" />
        		<List>
                    <Item arrow="horizontal" onClick={()=> this.onClick('/disclosure/law-list')}>查看法律法规</Item>
                    <Item arrow="horizontal" onClick={()=> this.onClick('/disclosure/regular-list')}>定期报告条目</Item>
                    <Item arrow="horizontal" onClick={()=> this.onClick('/disclosure/provisional-list')}>临时报告条目</Item>
                </List>
                <WhiteSpace size="lg" />
        		<div className="middle-btn" onTouchTap={()=>{this.props.history.push('/mine/creditor-list')}}>查看已关注债券</div>
        	</div>
        )
    }
}
