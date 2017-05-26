/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/05/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/05/2017
*/

import React from 'react';
import {Route} from 'react-router-dom';

const RouteWithSubRoutes = (route) => (
	<Route path={route.path} render={props => (<route.component {...props} routes={route.routes}/>)} onEnter={()=>{alert(1)}}/>
);

const Company = ({ routes })=> (
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

Company.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default Company;
