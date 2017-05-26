/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/27/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/27/2017
*/
import React from 'react';
import {get} from 'logics/rpc';
import { Button,Toast} from 'antd-mobile';

const TOTAL_SECONDS = 60;

export default class SendCodeBtn extends React.Component {
    constructor(props) {
      super(props);
      this.timer = null;
      this.state = {
          phone:this.props.phone,
          counting:false,
          seconds:TOTAL_SECONDS
      };
    }
    componentWillReceiveProps(nextProps) {
        let {phone} = nextProps;
        if (phone !== this.state.phone) {
            this.setState({phone,counting:false,seconds:TOTAL_SECONDS});
        }
    }
    async send() {
        let {phone,seconds} = this.state;
        let {uri} = this.props;
        if (!!!phone || phone.length !== 11) return;
        console.log(phone);
        this.setState({counting:true})
        this.count();
        let data = await get(uri, {
            body: {phone}
        });

        if (data.errors) {
            Toast.info(data.errors[0].message, 1);
        } else {
            Toast.info('发送验证码成功，请在10分钟之内验证', 1);
        }

        console.log('data',data);
    }
    count() {
        let {seconds} = this.state;
        let timer = setInterval(() => {
            seconds -= 1;
            if (seconds > 0) {
              this.setState({	seconds})
            } else {
                clearInterval(timer);
              this.setState({ counting:false, seconds:TOTAL_SECONDS});
            }
		    },1000);
      this.timer=timer;
    }
  componentWillUnmount() {
    if(this.timer){
      clearInterval(this.timer);
    }
  }
    render() {
        let {counting,seconds} = this.state;
        return (
            <Button type="primary" size="small" inline onClick={this.send.bind(this)} disabled={counting} style={{position:'absolute',right:12,top:7}}>{counting ? '重新发送'+seconds : '发送验证码'}</Button>
        )
    }
};
