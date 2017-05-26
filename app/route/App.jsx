/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/20/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/28/2017
 */

import React, {PropTypes} from 'react';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Popup} from 'antd-mobile';
import createHistory from 'history/createBrowserHistory'

const history = createHistory();

window.browserHistory = history;

import routes from './config';
import Nav from '../container/Nav.jsx';
import 'static/css/nav.scss';
import 'static/css/antd-mobile.min.css';
import Home from './Home.jsx';
import WxConfig from 'component/WxConfig.jsx';
import AuthWrapper from '../container/AuthWrapper';

WxConfig.init();

const RouteWithSubRoutes = (route) => (
	<Route path={route.path} render={props => (<route.component {...props} routes={route.routes}/>)}/>
)

const App = () => (
	<Router history={history}>
    <div>
			<div style={{marginTop: 44, marginBottom: 50 }}>
        <AuthWrapper>
			    {routes.map((route, index) => {
				     if (route.routes) {
					     route.routes.map((item,index) => {
						     return (
							     <item.sidebar title="trends" />
					       )})
				     } else {
					     return (
						     <div key={index}>
							     <Route
				   			     path={route.path}
				   			     exact={route.exact}
				   			     component={route.sidebar}
				   		     />
							     <Route
				 			       path={route.path}
				 			       exact={route.exact}
				 			       component={route.tabbar}
				 			     />
						     </div>
					     )
				     }
			     })}
			    {routes.map((route, i) => (<RouteWithSubRoutes key={i} {...route}/>))}
		    </AuthWrapper>
        <Route path='/' component={Home} />
      </div>
		</div>
	</Router>
)

export default App;
