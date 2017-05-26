/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/23/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/02/2017
 */

import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {Popup} from 'antd-mobile';
import MutiFilter from '../component/MutiFilter';
import releaseState from '../mobx/ReleaseState';
import RightCmp from './RightCmp.jsx';
import navState from '../mobx/NavState';

const showPopup = (e) => {
	e.preventDefault(); // 修复 Android 上点击穿透
	Popup.show(
		<MutiFilter onClose={() => Popup.hide()} mobxState={releaseState}/>);
}


import '../static/css/nav.scss';

export default class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showDropdownList: false
		};
	}
	static contextTypes = {
	  	router: PropTypes.object,
	};
	componentWillMount() {
	}
	onSelect(e) {
		this.setState({showDropdownList:true});
		e && e.preventDefault();
	}
	onClose(e) {
		this.state.showDropdownList && this.setState({showDropdownList:false});
		e && e.preventDefault();
	}
	onTouchTap(path) {
		let {history} = this.context.router;
		if (history.location.pathname.indexOf(path) > -1) {
			this.onClose();
		} else {
			history.push(path);
		}
	}
 	goHome() {
		let {history} = this.context.router;
		history.replace('/news/info');
	}
	event() {
		let {pathname} = window.location;
		navState.eventMap[pathname] && navState.eventMap[pathname](event);
	}
	render() {
		let {showDropdownList} = this.state;
		let {title,list,right} = this.props;
		let {pathname} = window.location;

		// <div className="nav-right">
		// 	{pathname.indexOf('/news/main-release') > -1 ? <div className="filter-icon" onTouchTap={(e)=>{showPopup(e,this)}}></div> : null}
		// </div>
		return (
			<div>
				<header id="nav-bar" className="nav-news">
					<div className="nav-left">
						<div className="logo" onTouchTap={this.goHome.bind(this)}></div>
						<div className="nav-title" onTouchTap={this.onSelect.bind(this)}>
							{title}
							{list ? <div className="arrow down-arrow"></div> : null}
						</div>
					</div>

					<RightCmp right={right} event={this.event.bind(this)} pathname={pathname} />
				</header>
				{showDropdownList && list.length ? <div style={{position:'absolute',top:0,left:0,bottom:0,right:0,zIndex:1998}} onTouchTap={this.onClose.bind(this)}>
					<div id="dropdown-list" style={{zIndex:2000}}>
						<div className="arrow b-arrow"><div className="arrow s-arrow"></div></div>
							<ul>
								{list && list.map((item) => (
									<li key={item.path}>
										<div onTouchTap={this.onTouchTap.bind(this,item.path)}>{item.name}</div>
									</li>
								))}
							</ul>
					</div>
				</div> : null}
			</div>
		)
	}
}
