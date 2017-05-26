/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/19/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/25/2017
 */

import React from 'react';
import {get} from 'logics/rpc';
import {Link} from 'react-router-dom';
import LawList from './LawList.jsx';
import title from './title';

export default class ProvisionalList extends LawList {
	renderLink(item) {
		return <Link to={`/content/view?title=${item.name}&params=${JSON.stringify({id:item.id})}&uri=/disclosure/provisional/get-by-id`}>{title(item.name)}</Link>
	}
	async fetch(id) {
		var data = await get('/disclosure/provisional/list',{body:{category:this.category}});
		this.setState({data:data.list})
	}
}
