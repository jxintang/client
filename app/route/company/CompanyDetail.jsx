/**
 * @Author: tangjingxin <tangduck>
 * @Date:   05/15/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/25/2017
*/

import React from 'react';
import BondTableItem from 'component/BondTableItem.jsx';
import PageListView from 'component/PageListView1.jsx';
import Fetcher from 'component/Fetcher.jsx';
import qs from 'query-string';
import {Link} from 'react-router-dom';
import {get,formatLargeMount} from 'logics/rpc';
import WxConfig from 'component/WxConfig.jsx';

const GridBox = ({value,title}) => (
    <div className="grid-box">
        <div className="grid-box-inner">
            <div className="bold">{value}</div>
            <span className="title">{title}</span>
        </div>
    </div>
)

class ResultHead extends React.Component {
    render() {
        var {data} = this.props;
        if (data === null || data.issuer === null) return null
        return (
            <div className="company-bond-history-head">
                <div className="left">历史发债明细</div>
                <div className="right">共发行<i>{data.total_no_keyword}</i>只债券></div>
            </div>
        )
    }
}

class CompanyDetail extends React.Component {
    constructor(props) {
      super(props);
      let query = qs.parse(this.props.history.location.search);
      this.id = query.id;
      this.state = {
          data:null,
          more:false
      };
    }
    componentWillMount() {
        this.fetch();
    }
    async fetch() {
        var data = await get('/company/page/get-by-id',{body:{id:this.id}});
        this.setState({data:data.data});
        await WxConfig.share({title:data.data.company_name});
    }
    toggle(e) {
        if (__DEV__ && event.type.indexOf('mouseup') > -1) return;
        this.setState({more:!this.state.more})
    }
    render() {
        let {data,more} = this.state;
        if (data === null) return null;
        return (
            <div className="company-detail">
                <div className="company-item">
                    <div className="company-head">
                        <div className="left">{data.company_name}</div>
                        <div className="right"></div>
                    </div>
                    <div className="company-body">
                        {data.listed_company ? <span className="area-tag">上市企业</span> : null}
                        <p>{more ? data.introduction : data.introduction.substr(0,70) + '...'}</p>
                        <div className="toggle" onTouchTap={this.toggle.bind(this)}><span>{more ? '收起' : '展开'}</span></div>
                    </div>
                    <div className="company-foot"></div>
                </div>
                <div className="company-structure">
                    <div className="grid-item">
                        <GridBox value={data.chairman} title="法人代表"/>
                        <GridBox value={data.president} title="总经理"/>
                    </div>
                    <div className="grid-item">
                        <GridBox value={data.found_date} title="成立时间"/>
                        <GridBox value={formatLargeMount(data.reg_capital)} title="注册资本"/>
                    </div>
                    <div className="grid-item">
                      <GridBox value={data.company_property} title="企业性质"/>
                        <GridBox value={data.domain4} title="行业"/>
                    </div>
                    <div className="more">
                        <Link className="left" to={`/company1/business-scope?content=${data.business_scope}`}>经营范围</Link>
                        <Link className="right" to={`/company1/business-shareholders?list=${JSON.stringify(data.shareholders)}`}>股权结构</Link>
                        <div className="clearfix"></div>
                    </div>
                    <p>数据是大债门基于公开信息搜集整理的结果，大债门不对数据准确、全面、真实性负责</p>
                </div>
                <div className="company-bond-history">
                    <Fetcher uri="/issuer/by-id" params={{id:this.id}}>
                        <ResultHead />
                        <PageListView params={{id:'F8C51'}} rowCmp={BondTableItem} />
                    </Fetcher>
                </div>
            </div>
        )
    }
}

export default CompanyDetail;
