/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/22/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/26/2017
 */

import React from 'react';
import { SwipeAction,List,Checkbox,Button,Modal } from 'antd-mobile';
import {Link } from 'react-router-dom';
import PageListView from 'logics/PageListView.jsx';
import RowTable from 'component/RowTable.jsx';
import {get} from 'logics/rpc';
import 'static/css/me.scss';
import navState from 'mobx-state/NavState';

const alert = Modal.alert;
const CheckboxItem = Checkbox.CheckboxItem;
const rows = [
    {
        title:'发行人：',
        key:'issuer_name'
    },
    {
        title:'债券简称：',
        key:'abbrev_name'
    },
    {
        title:'到期日期：',
        key:'end_date'
    },
];

export default class CreditorList extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          data: null,
          edit: false,
          isSelectAll: false, // 是否全选
          ids: [] // 选中的债券id集合
      };

      this.allIds = []; // 当前所有的债券id集合
    }
    componentWillMount() {
        navState.addEventListener('/mine/creditor-list',(e)=>{this.edit(e)});
        this.fetch();
    }
    async fetch() {
        var data = await get('/mybond/list',{method:'POST'});
        this.setState({data});
        this.setAllIds(data);
        this.initRightCmp(data);
    }
    initRightCmp(data) {
        if(Object.keys(data.group).length == 0) {
            navState.removeState('/mine/creditor-list');
        } else {
            navState.addState('/mine/creditor-list',0);
        }
    }
    // 设置全部Ids
    setAllIds(data) {
        Object.keys(data.group).map((key)=>{
            data.group[key].map((item)=>{
                this.allIds.push(item.wind_code);
            })
        });
    }
    selectAll() {
        if (this.state.edit === false) return;
        let {ids,isSelectAll} = this.state;
        isSelectAll = !isSelectAll;
        this.setState({ids:isSelectAll ? this.allIds : [],isSelectAll});
    }
    confirm() {
        if (this.state.ids.length === 0) return;
        alert('删除', '确定删除么?', [{ text: '取消'},{ text:'确定', onPress:this.del.bind(this)}])
    }
    async del(id) {
        let ids = id instanceof String ? [id] : this.state.ids;
        var data = await get('/bond_follow/del-list',{body:{id_list:ids}});
        this.fetch();
    }
    edit(e) {
        e && e.preventDefault();
        let edit = !this.state.edit;
        this.setState({edit});
        navState.addState('/mine/creditor-list',edit ? 1 : 0);
    }
    changeIds(id) {
        let {ids} = this.state,
            isSelectAll = false;
        if (ids.indexOf(id) > -1) {
            ids = ids.filter((item)=> item !== id);
        } else {
            ids.push(id)
        }

        isSelectAll = ids.length === this.allIds.length;

        this.setState({ids,isSelectAll});
    }
    render () {
        let {data,isSelectAll,firstLoading} = this.state;
        if (data === null) return null;

        // this.del.bind(this,item.wind_code)
        return (
            <div style={{paddingTop:15}} className="my-creditor-list-box">
                {
                    this.state.data && Object.keys(data.group).map((key)=>(
                        <div key={key} style={{paddingLeft:15,marginBottom:10,backgroundColor:'#fff'}}>
                            <div style={{padding:10,borderBottom:'1px solid #DEDEDE'}}>{key}</div>
                            {
                                data.group[key].map((item)=>{
                                    return (
                                        <div className="my-creditor-item" key={item.wind_code}>
                                            <SwipeAction
                                              key={item.wind_code}
                                              style={{ backgroundColor: 'gray' }}
                                              autoClose
                                              right={[
                                                {
                                                  text: '取消',
                                                  onPress: () => console.log('取消'),
                                                  style: { backgroundColor: '#ddd', color: 'white' },
                                                },
                                                {
                                                  text: '删除',
                                                  onPress: () => console.log('删除'),
                                                  style: { backgroundColor: '#F4333C', color: 'white' },
                                                },
                                              ]}>
                                              {this.state.edit
                                                    ? <CheckboxItem onChange={this.changeIds.bind(this,item.wind_code)} checked={this.state.ids.indexOf(item.wind_code) > -1}>
                                                            <RowTable key={item.wind_code} rows={rows} data={item} className="row-table-activity"/>
                                                      </CheckboxItem>
                                                    : <List.Item>
                                                        <Link to={`/bond/detail?id=${item.wind_code}`}>
                                                            <RowTable key={item.wind_code} rows={rows} data={item} className="row-table-activity"/>
                                                        </Link>
                                                      </List.Item>}
                                            </SwipeAction>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
                {
                    Object.keys(data.group).length
                    	? <div className="fixed-handler-box">
                    			<Button type="primary" inline size="small" className="btn" style={{
                    				marginRight: '0.08rem'
                    			}} onClick={this.selectAll.bind(this)}>{isSelectAll
                    					? '取消全选'
                    					: '全选'}</Button>
                    			<Button type="primary" inline size="small" className="btn btn-red" style={{
                    				marginRight: '0.08rem'
                    			}} onClick={this.confirm.bind(this)}>删除</Button>
                    			<Button type="primary" inline size="small" className="btn" style={{
                    				marginRight: '0.08rem'
                    			}} onClick={() => {
                    				this.props.history.push('/setting/notifications')
                    			}}>提醒设置</Button>
                    		</div>
                    	: null
                }
            </div>
        )
    }
}
