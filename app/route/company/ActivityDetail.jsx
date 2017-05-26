/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/06/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/25/2017
*/

import React from 'react';
import qs from 'query-string';
import moment from 'moment';
import { List,Toast,Modal } from 'antd-mobile';
import {get} from 'logics/rpc';
import 'static/css/activity.scss';
import RowTable from 'component/RowTable.jsx';
import WxConfig from 'component/WxConfig.jsx';

const Item = List.Item;
const alert = Modal.alert;

const rows = [
    {
        title:'活动时间：',
        key:'begin_time',
        key1:'end_time',
        render: (name,name1)=> {
            return (
                <div className="rating-range">{moment(name).format('YYYY-MM-DD')}至{moment(name1).format('YYYY-MM-DD')}</div>
            )
        }
    },
    {
        title:'活动地点：',
        key:'location'
    }
]

const rows1 = [
    {
        title:'详细地址：',
        key:'contact_address'
    },
    {
        title:'联系人：',
        key:'contact_name'
    },
    {
        title:'联系方式：',
        key:'contact_tel'
    },
]

const star = '*******';

const contact = {
    contact_name:star,
    contact_info:star,
    contact_address:star,
    contact_tel:star,
}

const Button = ({event,className,text})=>(
    <button className={"button " + className} onTouchTap={event}>{text}</button>
)

export default class ActivityDetail extends React.Component {
    constructor(props) {
      super(props);

      let query = qs.parse(this.props.history.location.search);
      this.id = query.id;

      this.state = {
          data:null,
          contact: null,
          more: false
      };
    }
    componentWillMount() {
        this.fetch();
    }
    async fetch() {
        var data = await get('/company/activity/get-by-id',{body:{id:this.id}});
        this.setState({data:Object.assign({},contact,data.data)});
        await WxConfig.share({title:data.data.name});
    }
    async apply() {
        var data = await get('/company/activity/apply',{body:{id:this.id}});
        if (data.errors) {
            Toast.info(data.errors[0].message || '报名失败', 1);
        } else {
            Toast.info('报名成功', 1);
            this.fetch();
        }
    }
    showModal() {
        alert('确认', '确定要报名么?', [
          { text: '取消'},
          { text: '确定', onPress: () => this.apply() },
        ])
    }
    renderApply() {
        let {apply_begin_time,apply_end_time,begin_time,end_time,contact_address} = this.state;
        let Btn = null;

        if (moment().unix() < moment(apply_begin_time).unix()) {
            Btn = <Button text="报名尚未开始" className="gray-btn" />
        } else if (moment().unix() > moment(end_time).unix()) {
            Btn = <Button text="活动已结束" className="gray-btn" />
        } else if (moment().unix() > moment(apply_end_time).unix()) {
            Btn = <Button text="报名已结束" className="gray-btn" />
        } else {
            Btn = <Button text="报名" className="apply-btn" event={this.showModal.bind(this)} />
        }
        return (
            <div className="contact-wrapper-mask">{Btn}</div>
        )
    }
    toggle() {
        let {more} = this.state;
        this.setState({more:!more})
    }
    render() {
        let {data,more} = this.state;
        if (data === null) return null;
        let {name,apply_count,apply_fee,industry,host_org,company,brief_intro,contact_name,contact_address,contact_tel} = data;

        // <span className="tag">已有{apply_count}人报名</span>
        return (
            <div className="activity-detail-wrapper">
                <div className="activity-detail-top">
                    <h3>{name}</h3>
                    <RowTable rows={rows} data={data}/>
                </div>
                <List className="my-list" style={{marginTop:10}}>
                    <Item extra={apply_fee + '元/人'}>报名费用</Item>
                    <Item extra={host_org}>组织机构</Item>
                    <Item extra={industry}>相关行业</Item>
                    <Item extra={more ? '' : brief_intro} onClick={this.toggle.bind(this)} arrow="horizontal">活动简介
                    </Item>

                </List>
                {more ? <p className="more">{brief_intro}</p> : null}
                <div className="contact-wrapper">
                    <h3>联系方式</h3>
                    <div style={{paddingTop:10,paddingBottom:10}}>
                        <RowTable rows={rows1} data={data}/>
                    </div>
                    {contact_address !== star && contact_name !== star && contact_address !== star ? null : this.renderApply()}
                </div>
            </div>
        )
    }
}
