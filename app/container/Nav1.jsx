/**
 * @Author: tangjingxin <jxintang>
 * @Date:   03/13/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/02/2017
 */

import React from 'react';
import {Link} from 'react-router-dom';
import { observer } from 'mobx-react';
import createHistory from 'history/createBrowserHistory';
import navState from 'mobx-state/NavState';
import RightCmp from './RightCmp.jsx';

const history = createHistory();
import 'static/css/nav.scss';

const TabList = ['/news/info','/disclosure/list','/mine/list','/company1/newbond','/bond/find'];

@observer
export default class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	event(event) {
		let {pathname} = window.location;
		navState.eventMap[pathname] && navState.eventMap[pathname](event);
	}
	goBack() {
		event.preventDefault();
		if (__DEV__ && event.type === 'react-mouseup') return;
		history.goBack();
	}
	render() {
		let {showDropdownList} = this.state;
		let {title,right} = this.props;
		let {pathname} = window.location;

		return (
			<header id="nav-bar" className="nav">
				<div className="nav-left">
					{
						TabList.indexOf(pathname) === -1 ? (window.history.length > 1 ? <div onTouchTap={this.goBack.bind(this)} className="back-icon"></div> : <div className="logo" onTouchTap={()=>browserHistory.push(TabList[0])}></div>) : null
					}
				</div>
                <div className="nav-title">
                    {navState.navMap[pathname] || title}
                </div>
				<RightCmp right={right} event={this.event.bind(this)} pathname={pathname}/>
                <div className="clearfix"></div>
			</header>
		)
	}
}
