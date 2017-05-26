/**
 * @Author: tangjingxin <jxintang>
 * @Date:   03/06/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/10/2017
 */

import React from 'react';
import { Link } from 'react-router-dom';

export default class SliderItem extends React.Component {
	render() {
		let {data} = this.props;

		if (!data) return null;
		let q = encodeURI(data.namerating);
		let url = `/bond/history-trends?namerating=${q}&term_year=${data.term_year}`;
		return (
			<Link className="slider-item" to={url} >
				<div>{data.term_year >= 1 ? `${data.term_year}年` : `${data.term_year * 12}个月`}</div>
				<div className={data.current_yield_rate - data.previous_yield_rate > 0
					? "increase"
					: "decrease"}>{data.current_yield_rate}
					<i></i>
				</div>
				<div>{data.current_yield_rate > data.previous_yield_rate ? '+' : ''}{(data.current_yield_rate - data.previous_yield_rate).toFixed(4)}</div>
				<span className="tips">点击查看趋势图</span>
			</Link>
		)
	}
}
