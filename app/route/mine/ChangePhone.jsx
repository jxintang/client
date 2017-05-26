/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/27/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/27/2017
*/

import React from 'react';
import navState from 'mobx-state/NavState';
import SendCodeItems from 'component/SendCodeItems.jsx';
import {Toast} from 'antd-mobile';
import {get} from 'logics/rpc';

export default class ChangePhone extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          step:1,
          data:null
      };
    }
    componentWillMount() {
        navState.addNavTitle('/mine/change-phone','验证旧手机号');
        this.fetch();
    }
    async fetch() {
        let data = await get('/me/secure_phone/change/current');
        this.setState({data});
    }
    submit(data) {
        if (data.errors) {
            Toast.info(data.errors[0].message, 1);
        } else {
            navState.addNavTitle('/mine/change-phone','验证新手机号');
            this.setState({
                step:2
            })
        }

    }
    confirm(data) {
        if (data.errors) {
            Toast.info(data.errors[0].message, 1);
        } else {
            this.props.history.replace('/mine/list');
        }
    }
    render() {
        let {step,data} = this.state;
        if (data === null) return null;
        if (step === 1) {
            return <SendCodeItems submit={this.submit.bind(this)} submitUri="/me/secure_phone/change/check" sendUri="/me/secure_phone/change/send_code" buttonText="确认" phonePlaceholder="请输入旧手机号" phoneLabel="旧手机号" phone={data.data} disabled={true}/>
        } else if (step === 2) {
            return <SendCodeItems submit={this.confirm.bind(this)} submitUri="/me/secure_phone/change/new_check" sendUri="/me/secure_phone/change/new_send_code" buttonText="确认" phonePlaceholder="请输入新手机号" phoneLabel="新手机号" disabled={false}/>
        }

    }
}
