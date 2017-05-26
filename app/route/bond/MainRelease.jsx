/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/20/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/17/2017
 */

import React from 'react';
import { observer } from 'mobx-react';
import { List,WhiteSpace } from 'antd-mobile';
import Dialog from 'rc-dialog';
import moment from 'moment';
import TableListView from 'component/TableListView';
import SelectList from 'component/SelectList';
import RateSelect from 'component/RateSelect.jsx';
import FilterBar from 'component/FilterBar/index.jsx';
import CitySelect from 'component/CitySelect.jsx';
import GridList from 'component/GridList.jsx';
import 'static/css/global.scss';
import {CONTENT_HEIGHT,TABBAR_HEIGHT,NAV_HEIGHT,DATE_LIST,RATE_LIST} from '../../route/const';
import releaseState from '../../mobx/ReleaseState';

const renderCenter = (v) => (<div className="text-center">{v}</div>);

const columns = [
  { title: '债券简称', dataIndex: 'abbrev_name', key: 'abbrev_name', width:100,fixed: 'left', render: (value) => (
      <div className="fix-width" style={{width:110}}>{value}</div>
  ) },
  { title: '发行日期', dataIndex: 'issue_start_date', key: 'issue_start_date', width: 300, render: (v) => renderCenter(v) },
  { title: '发行规模(亿)', dataIndex: 'issue_actual_amount', key: 'issue_actual_amount', render: (v) => renderCenter(v)},
  { title: '发行期限(年)', dataIndex: 'term_in_year', key: 'term_in_year', render: (v) => renderCenter(v) },
  { title: '特殊期限', dataIndex: 'special_term', key: 'special_term', width: 100, render: (v) => renderCenter(v) },
  { title: '发行利率', dataIndex: 'coupon_rate', key: 'coupon_rate', width: 100, render: (v) => renderCenter(v) },
  { title: '主体评级', dataIndex: 'issuer_rating', key: 'issuer_rating', width: 100, render: (v) => renderCenter(v) },
  { title: '债项评级', dataIndex: 'current_rating', key: 'current_rating', width: 100, render: (v) => renderCenter(v) },
  { title: '企业性质', dataIndex: 'company_property', key: 'company_property', width: 100, render: (v) => renderCenter(v)},
  { title: '增信方式', dataIndex: 'guar_type', key: 'guar_type', width: 100, render: (value) => (
      <div className="fix-width">{value}</div>
  ) },
  { title: '发行人', dataIndex: 'issuer_name', key: 'issuer_name', height:51, width: 100, render: (value) => (
      <div className="fix-width" style={{width:90}}>{value}</div>
  ) },
  { title: '地区', dataIndex: 'issuer_province', key: 'issuer_province', width: 100 },
  { title: '主承销商', dataIndex: 'lead_agency', key: 'lead_agency', width: 100, render: (value) => (
      <div className="fix-width" style={{width:90}}>{value}</div>
  )},
  { title: '行业', dataIndex: 'domain4', key: 'domain4', width: 100 },
  { title: '债券类别', dataIndex: 'industry_name2', key: 'industry_name2', width: 100 },
];

const data = {
    cmpType:'radio-box',
    paramsType:'name1',
    list:[
        {
            val:'企业债',
            name:'企业债',
        },
        {
            val:'金融债',
            name:'金融债',
        },
        {
            val:'公司债',
            name:'公司债',
        },
        {
            val:'中期票据',
            name:'中期票据',
        },
        {
            val:'短期融资券',
            name:'短期融资券',
        },
        {
            val:'定向工具',
            name:'定向工具',
        },
    ]
}

const Item = List.Item;

const NAME1_LIST = ['企业债', '金融债', '公司债', '中期票据', '短期融资券', '定向工具'];

const STORAGE_MAINRELEASE_NAME = 'main-release-name1';

@observer
export default class MainRelease extends React.Component {
    constructor(props) {
      super(props);

      let name = localStorage.getItem(STORAGE_MAINRELEASE_NAME);
      name = name || NAME1_LIST[0];

      this.state = {
          visible: false,
          onClose: false,
      };

      this.setParams(name);

      localStorage.removeItem(STORAGE_MAINRELEASE_NAME);
    }
    componentWillUnmount() {
        // 进入债券详情页时记录用户的选择
        if (this.props.history.location.pathname === '/bond/detail') {
            localStorage.setItem(STORAGE_MAINRELEASE_NAME,this.curTab);
        }
    }
    onOpen(e) {
        e && e.preventDefault();
        this.setState({visible:true,onClose:true});
    }
    setParams(item) {
        releaseState.setParams({name1:item});
        this.curTab = item;
    }
    close() {
        event && event.preventDefault();
        this.setState({visible:false})
    }
    renderTitle() {
        return (
            <div style={{fontSize:14}} className="g-arrow-wrapper active" onTouchTap={this.onOpen.bind(this)}>
                债券类别
                <span style={{paddingLeft: 10}}>{releaseState.getParams().name1}</span>
                <i className="g-arrow-down"></i>
            </div>

        )
    }
    onRowClick(record, index, event) {
        this.props.history.push(`/bond/detail?id=${record.wind_code}`);
	}
    render() {
        let {params,onClose} = this.state;
        let minDate = moment();
        minDate.month(minDate.month() - 3);
        return (
            <div style={{height:'auto',textAlign:'center',position:'fixed',top:44,bottom:0,left:0,right:0}}>
                <List className="my-list">
                    <Item>{this.renderTitle()}</Item>
                </List>
                <WhiteSpace size="xl" />
                <FilterBar header={['发行日期', '主体评级', '地区']} content={[
                    <SelectList data = {DATE_LIST} mobxState={releaseState} minDate={minDate}/>,
                    <RateSelect data = {Object.assign({},RATE_LIST,{paramsType:'issuer_rating_list'})} mobxState={releaseState} middleBtn={true} wrapper={true}/>,
                    <CitySelect mobxState={releaseState} wrapper={true} leftBtnText="恢复至全国" />
                ]} maskStyle={{top:156}} wrapClassName="release-filter" onClose={onClose}/>

                <TableListView
                    uri="/bondf/list"
                    params={releaseState.params}
                    columns={columns}
                    showCount={false}
                    onRowClick={this.onRowClick.bind(this)}
                    height={CONTENT_HEIGHT-TABBAR_HEIGHT-NAV_HEIGHT-120}
                    doFetch={true} />
                <Dialog wrapClassName="main-release-filter filter-wrapper-style" visible={this.state.visible} closable={false} onClose={this.close.bind(this)} maskStyle={{top: 90}}>
    				<GridList data={data} mobxState={releaseState} onClick={(v) => {
    					this.setParams(v);
    					this.close()
    				}}/>
    			</Dialog>
            </div>
        )
    }
}
