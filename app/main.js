/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/02/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/26/2017
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './route/App.jsx';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin({
	shouldRejectClick: function(lastTouchEventTimestamp, clickEventTimestamp) {
		return false;
	}
});

window.addEventListener('error', function(e) {
	console.error('caught the error: ' + e.message);
});

ReactDOM.render(<App/>, document.getElementById('app'));
