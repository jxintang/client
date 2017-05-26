/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/26/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/09/2017
*/

import React from 'react';
import emitter from 'logics/notification';
import {Popup} from 'antd-mobile';
import Login from './auth/Login.jsx';
import Mask from 'component/Mask.jsx';

class Home extends React.Component {
  componentWillMount() {
		this.props.history.listen((state:Object,action) => {
			if (action === 'PUSH' || action === 'REPLACE') {
				window.scrollTo(0, 0);
			}
	    });
	}

    render() {
		return <Mask history={this.props.history} />
	}
}

export default Home;
