/**
 * @Author: tangjingxin <jxintang>
 * @Date:   03/20/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/25/2017
 */

import React from 'react';
import qs from 'query-string';
import {List, WhiteSpace} from 'antd-mobile';
import {Link} from 'react-router-dom';
import {get} from 'logics/rpc';
import 'static/css/info.scss';
import FooterTabs from 'component/FooterTabs.jsx';
import title from './title';

const Item = List.Item;

export default class InfoLawList extends React.Component {
	constructor(props) {
		super(props);

		let query = qs.parse(this.props.location.search);
		this.category = query.category;
		this.state = {
			data: null
		};
	}
	componentWillMount() {
		this.fetch();
	}
	async fetch(id) {
		var data = await get('/disclosure/law/list', {
			body: {
				category: this.category
			}
		});
		this.setState({data: data.list})
	}
	renderLink() {
		return <Link to={`/content/view?title=${item.name}&params=${JSON.stringify({id: item.id})}&uri=/disclosure/law/get-by-id`}>{title(item.name || item)}</Link>
	}
	render() {
		let {data} = this.state;
		if (data === null)
			return null;
		return (
			<div>
				<WhiteSpace size="lg"/>
				<div className="info-report">
					<div className="report-header">
						{this.category}
					</div>
					<div className="report-list">
						{data.map((item, index) => (
							<div className="report-item" key={index}>
								{this.renderLink(item)}
							</div>
						))
}
					</div>
				</div>
			</div>
		)
	}
}
