/**
 * created by jxintang on 3/1/17.
 */

import React, {PropTypes} from 'react';
import '../static/css/slider-bar.scss';

const SliderBar = ({list,curIndex,onTouchEvent}) => (
	<div className="slide-bar">
		{list.map((item, index) => (
			<div className={index === curIndex
				? 'slide-item active'
				: 'slide-item'} onTouchTap={()=>onTouchEvent(index)} key={index}>
				{item}
				<i></i>
			</div>
		))}
	</div>
)

export default SliderBar;
