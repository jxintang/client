/**
 * created by jxintang on 2/16/17.
 */

import React from 'react';
import '../static/css/search-bar.scss';

export default class SearchBar extends React.Component {
	render() {
		return (
			<div className="search-bar">
                <div className="search-icon">
                    <img src="/static/images/search-icon.png"
                         srcSet="/static/images/search-icon.png 1x, /static/images/search-icon@2x.png 2x, /static/images/search-icon@3x.png 3x"
                         sizes = "(max-width: 360px) 44px, 22px"
                         alt="search" />
                </div>
                <input placeholder="请输入关键字搜索" />
            </div>
		)
	}
}
