/**
 * @Author: tangjingxin <jxintang>
 * @Date:   03/02/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/27/2017
 */

import React from 'react';
import {Route, Link } from 'react-router-dom';
import { SwipeAction,List,Toast } from 'antd-mobile';
import 'static/css/article-item.scss';
import {get} from 'logics/rpc';

function ALink({link, children}){
	if(link.direct_link){
		return (<a className="article-item" href={link.source_url}>{children}</a>)
	}else{
		return (
			<Link className="article-item"  to={{
				  pathname: '/news/content-detail',
				  search: `?id=${link.id}`,
				  state: { fromDashboard: true }
			  }}>{children}</Link>
		)
	}
}
class ArticleItem extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = {
		  is_bookmark:this.props.item.is_bookmark
	  };
	}
	renderItem() {
		let {item,rowID} = this.props;
		return (
			<ALink link={item} >
				<div className="article-content">
					<div className="article-head">{item.title}</div>
					<div className="article-info">{item.source_name}</div>
				</div>
				<div className = "article-img"> <img className="media-object pull-left article-img" src={item.title_image_url} height="75" width="90"/> </div>
				<div className="clearfix"></div>
			</ALink>
		)
	}
	async add(id) {
		var data = await get('/content_bookmark/add',{body:{content_id:id}});
		this.setState({is_bookmark:true});
		Toast.info('添加收藏成功！', 1);
	}
	async del() {
		var data = await get('/content_bookmark/del',{body:{content_id:id}});
		this.setState({is_bookmark:false});
		Toast.info('取消收藏成功！', 1);
	}
	render() {
		let {item} = this.props;
		let {is_bookmark} = this.state;

		// <SwipeAction
		//   key={item.id}
		//   style={{ backgroundColor: 'gray',width:120 }}
		//   autoClose
		//   right={[
		// 	{
		// 	  text: is_bookmark ? '取消收藏' : '添加至收藏夹',
		// 	  onPress: () => {is_bookmark ? this.del(item.id) : this.add(item.id)},
		// 	  style: { backgroundColor: '#F4333C', color: 'white'},
		// 	},
		//   ]}>
		//  {this.renderItem()}
		// </SwipeAction>

		return (
			<div>{this.renderItem()}</div>
		)
	}
}

export default ArticleItem;
