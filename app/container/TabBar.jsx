/**
 * @Author: tangjingxin <jxintang>
 * @Date:   03/06/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/25/2017
 */

import React from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';

const history = createHistory();

import '../static/css/tabbar.scss';

history.listen((location, action) => {
  // location is an object like window.location
  console.log(action, location.pathname, location.state)
})

export default class Tabbar extends React.Component {
	constructor() {
		super();
		this.tabs = [
			{
				className: 'tab-item active',
				to: '/news/info',
				iconClassName: 'icon icon-news',
				rootPath:'/news',
				title: '资讯门'
			}, {
				className: 'tab-item active',
				to: '/bond/find',
				iconClassName: 'icon icon-find-creditor',
				rootPath: '/bond',
				title: '上债啦'
			}, {
				className: 'tab-item active',
				to: '/company1/campaign',
				iconClassName: 'icon icon-my-creditor',
				title: '债·企业',
				rootPath: '/company1',
			}, {
				className: 'tab-item active',
				to: '/disclosure/list',
				iconClassName: 'icon icon-info-disclosure',
				title: '信息披露',
				rootPath: '/disclosure'
			},{
				className: 'tab-item active',
				to: '/mine/list',
				iconClassName: 'icon icon-me',
				title: '我',
				rootPath: '/mine'
			}
		]
	}
	oddEvent (rootPath, match, location){
		return location.pathname.indexOf(rootPath) === 0;
	}
	componentDidMount() {

	}
	render() {
		return (
		  <nav className="tabbar">
                {
                    this.tabs.map((item)=> (
                        <NavLink className="tabbar-item" activeClassName="active" isActive={this.oddEvent.bind(this,item.rootPath)} to={item.to} key={item.to} replace>
        					<span className={item.iconClassName}></span>
        					<span className="tab-label">{item.title}</span>
        				</NavLink>
                    ))
                }
			</nav>
		)
	}
}
