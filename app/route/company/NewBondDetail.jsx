/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/06/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/25/2017
*/

import React from 'react';
import qs from 'query-string';
import {get} from 'logics/rpc';
import Dialog from 'rc-dialog';
import 'static/css/newbond-detail.scss';
import RowTable from 'component/RowTable.jsx';
import WxConfig from 'component/WxConfig.jsx';

const rows = [
    {
        title:'债券名称：',
        key:'bond_name'
    },
    {
        title:'债券类型：',
        key:'category'
    },
    {
        title:'发行人：',
        key:'issuer_name'
    },
    {
        title:'地区：',
        key:'issuer_area'
    },
    {
        title:'企业性质：',
        key:'issuer_type'
    },
    {
        title:'发行规模：',
        key:'issue_plan_amount'
    },
    {
        title:'发行期限：',
        key:'term_and_special'
    },
    {
        title:'询价区间：',
        key:'coupon_rate_min',
        key1:'coupon_rate_max',
        render: (k,k1)=> (
            <div>{k}%-{k1}%</div>
        )
    },
    {
        title:'预计发行时间：',
        key:'issue_plan_start_date'
    },
    {
        title:'信用评级：',
        key:'issuer_rating',
        key1:'current_rating',
        render: (k,k1) => (
            <div>{k || '--'}/{k1 || '--'}</div>
        )
    },
    {
        title:'增信方式：',
        key:'guar_type'
    },
    {
        title:'主承销商：',
        key:'lead_agency'
    },
];

const GridBox = ({value,title}) => (
    <div className="grid-box">
        <div className="grid-box-inner">
            <div className="bold">{value}</div>
            <span className="title">{title}</span>
        </div>
    </div>
)

export default class NewBondDetail extends React.Component {
    constructor(props) {
      super(props);
      let query = qs.parse(this.props.history.location.search);
      this.id = query.id;
      this.state = {
          data:null,
          visible: false
      };
    }
    componentWillMount() {
        this.fetch();
    }
    async fetch() {
        var data = await get('/company/newbond/get-by-id',{body:{id:this.id}});
        this.setState({data:data.data});
        await WxConfig.share({title:data.data.bond_name});
    }
    close() {
        this.setState({visible:false})
    }
    open() {
        this.setState({visible:true})
    }
    render() {
        let {data} = this.state;
        if (data === null) return null;
        let {bond_name,issuer_name,issue_plan_start_date,current_rating,term_and_special,issuer_rating,issuer_type,term_in_year,issue_plan_amount,available_amount,coupon_rate_min,coupon_rate_max} = data;
        return (
            <div className="newbond-detail-wrapper">
                <div className="newbond-detail-head">
                    <h3>{bond_name}</h3>
                    <div className="rate-box">
                        <strong>{coupon_rate_min}% ~ {coupon_rate_max}%</strong>
                        <div className="title">询价区间</div>
                        <i className="blue-tag">预计发行时间：{issue_plan_start_date}</i>
                    </div>
                </div>
                <div className="newbond-detail-content">
                    <div className="grid-item">
                        <GridBox value={term_and_special} title="期限"/>
                        <GridBox value={`${issuer_rating || '--'}/${current_rating || '--'}`} title="主体/债项"/>
                    </div>
                    <div className="grid-item">
                        <GridBox value={`${issue_plan_amount}亿`} title="募资规模"/>
                        <GridBox value={issuer_type} title="企业性质"/>
                    </div>
                </div>
                <div className="newbond-detail-more">
                    <h3>债券详情</h3>
                    <RowTable rows={rows} data={data} />
                </div>
                <a className="contact-btn" onTouchTap={this.open.bind(this)}>咨询客服人员</a>
                <Dialog wrapClassName="filter-wrapper-style new-bond-dialog" visible={this.state.visible}  onClose={this.close.bind(this)}>
                    <div style={{paddingTop:40,textAlign:'center',paddingBottom:10}}>
                        <p style={{margin: 0,fontSize: 14}}>请添加客服 “大债门小掌柜” 微信进行咨询</p>
                        <img src="/static/images/qr-service.jpeg" width="282"/>
                        <p style={{margin: 0,fontSize: 14, fontFamily:"'STHeiti', 'simsun', sans-serif"}}>微信号 ficc616</p>
                    </div>
                </Dialog>
            </div>
        )
    }
}
