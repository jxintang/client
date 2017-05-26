/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/21/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/28/2017
*/

import React from 'react';
import { List, InputItem,Button,Toast,WhiteSpace } from 'antd-mobile';
import qs from 'query-string';
import {get} from 'logics/rpc';
import SendCodeItems from 'component/SendCodeItems.jsx';

class Login extends React.Component {
    async submit(data) {
        let {callback,history} = this.props;
        if (data.errors) {
            Toast.info(data.errors[0].message, 1);
        } else if (callback) {
            callback();
        } else {
            if (history.canGo && history.canGo()) {
                this.props.history.goBack();
            } else {
                this.props.history.replace('/mine/list');
            }

        }
    }
    render() {
        return (
            <SendCodeItems submit={this.submit.bind(this)} submitUri="/secure_phone/check" sendUri="/secure_phone/send_code" />
        )
    }
}

export default Login;
