/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/13/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/13/2017
*/

import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router-dom';
import PageList from '../../logics/PageList';
import BondItem from '../../component/BondItem.jsx';
import SearchBar from '../../component/SearchBar.jsx';
import FilterBar from '../../component/FilterBar/index.jsx';
import CitySelect from '../../component/CitySelect.jsx';
import RateSelect from '../../component/RateSelect.jsx';
import {NavBar} from 'antd-mobile';

const onEnter = function(location, match) {
	alert(location.pathname)
}

const RouteWithSubRoutes = (route) => (
	<Route path={route.path} render={props => (<route.component {...props} routes={route.routes}/>)} onEnter={()=>{alert(1)}}/>
);

const News = ({ routes })=> (
	<div>
		{routes.map((route, index) => (
			<Route
			   key={index}
			   path={route.path}
			   exact={route.exact}
			   component={route.sidebar}
			 />
		))}
		<div className="scroll-content">
			{routes.map((route, i) => (
				<RouteWithSubRoutes key={i} {...route}/>
			))}
		</div>
		{routes.map((route, index) => (
			<Route
			   key={index}
			   path={route.path}
			   exact={route.exact}
			   component={route.tabbar}
			 />
		))}
	</div>
)

News.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default News;
