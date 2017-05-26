/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/08/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/19/2017
 */

import React from 'react';
import ReactIScroll from 'react-iscroll';
import {ActivityIndicator} from 'antd-mobile';
var HtmlToReactParser = require('html-to-react').Parser;

var htmlToReactParser = new HtmlToReactParser();

// import iScroll from 'iscroll/build/iscroll-probe';
var iScroll = require('iscroll/build/iscroll-probe');
import Table from 'rc-table';
import 'rc-table/assets/index.css';
import {get} from '../logics/rpc';
// import '../static/css/antd-mobile.min.css';
import '../static/css/table-style.scss';
import {CONTENT_HEIGHT} from '../route/const.js';

const options = {
    // 滚动事件的探测灵敏度，1-3，越高越灵敏，兼容性越好，性能越差
    probeType: 3,
    // 拖拽超过上下界后出现弹射动画效果，用于实现下拉/上拉刷新
    bounce: true,
    // 展示滚动条
    scrollbars: false,
    scrollX:true,
    scrollY:true,
    // 支持事件穿透
    eventPassthrough:'horizontal',
    disableMouse: true,
    disablePointer: true,
    disableTouch: true
};

const verticalY = 140; // 触动更新的距离
const PAGESIZE = 10;
const CONTROL_HEIGHT = 40;
let dataSource = [];

export default class TableListView extends React.Component {
    constructor(props) {
      super(props);
      this.offset = 0;
      this.total = 0;
      this.isTouching = false;
      this.params = {};

      this.pullDownTips = {
          // 下拉状态
          0: '下拉发起刷新',
          1: '继续下拉刷新',
          2: '松手即可刷新',
          3: '正在刷新',
          4: '刷新成功',
      };

      this.pullUpTips = {
          // 上拉状态
          0: '上拉发起加载',
          1: '松手即可加载',
          2: '正在加载',
          3: '加载成功',
      };

      this.state = {
          pullDownStatus: 3,
          pullUpStatus: 0,
          list: [],
          init: true,
          data: null,
          showCount: this.props.showCount || true,
          fixedThead:null
      };
    }
    componentDidMount() {
        this.fetch(true,this.props.params);
    }
    componentWillReceiveProps(nextProps) {
        // 判断参数对象是否相当
        if (JSON.stringify(nextProps.params) !== JSON.stringify(this.props.params)) {
            let {doFetch} = nextProps;
            this.setState({pullDownStatus:3,pullUpStatus:0},()=>{
                typeof doFetch === 'boolean' && doFetch && this.fetch(true,nextProps.params);
            })
            // setTimeout(()=>this.setState({pullDownStatus:3,pullUpStatus:0}),0);
        }
    }
    async fetch(isRefresh,params = {}) {
        if (isRefresh) {
            this.offset = 0;
        }

        this.params = Object.assign({},params,{offset:this.offset});

        for (var key in this.params) {
            if (this.params[key] == '' || this.params.length === 0 || this.params[key] == null) {
                delete this.params[key];
            }
        }

        let {pullDownStatus,pullUpStatus} = this.state;
        let data = await get(this.props.uri,{method:'POST',body:this.params});

        if (isRefresh) {
            if (pullDownStatus == 3) {
                this.setState({
                    data,
                    list:data.list || [],
                    refresh:false,
                    loading:false,
                    init:false,
                    pullDownStatus: 4
                });

                this.refs.iScroll && this.refs.iScroll.withIScroll(true,(iScroll)=>{
                    iScroll.scrollTo(0,-CONTROL_HEIGHT,500)
                })
            }
        } else {
            if (pullUpStatus == 2) {
                this.setState({
                    data,
                    list:this.state.list.concat(data.list),
                    refresh:false,
                    loading:false,
                    init:false,
                    pullUpStatus: 0,
                });
            }
        }
        this.offset += PAGESIZE;
        this.total = data.total;
    }
    onTouchEnd() {
        this.isTouching = false;
    }
    onScrollStart(iScroll) {
        this.iScrollInstance = iScroll;
        this.isTouching = true;
    }
    onScroll(iScroll) {
        // 上拉区域
        if (iScroll.y > -CONTROL_HEIGHT) {
            this.onPullDown(iScroll);
        } else {
            this.state.pullDownStatus != 0 && this.setState({pullDownStatus: 0});
        }

        // 下拉区域
        if (iScroll.y <= iScroll.maxScrollY + 5) {
            this.onPullUp(iScroll);
        }

        // console.log('y',iScroll.y);
        // console.log('xxxxx',iScroll.directionY);

        let {fixedThead} = this.state;
        if (iScroll.directionY === 1) {
            if (parseInt(iScroll.y) <= -73) {
                fixedThead === null && this.setState({fixedThead:this.refs.table.tableNode.children[0].children[0].children[0].children[0].children[1]})
            }
            // console.log(this.refs.table.tableNode.children[0].children[0].children[0].children[0].children[1]);
            // console.log(this.refs.table.tableNode.children[0].children[0].children[0].children[1]);
        } else if (iScroll.directionY === -1) {
            if (parseInt(iScroll.y) >= -73) {
                fixedThead && this.setState({fixedThead:null})
            }
        }
    }
    onPullUp(iScroll) {
        // 手势
        if (this.isTouching) {
            let {pullUpStatus} = this.state;
            // alert(iScroll.y)
            if (iScroll.y <= iScroll.maxScrollY - 5) {
                pullUpStatus != 1 && this.setState({pullUpStatus: 1});
            } else {
                pullUpStatus != 0 && this.setState({pullUpStatus: 0});
            }
        }
    }
    onPullDown(iScroll) {
        let {pullDownStatus} = this.state;
        // 手势
        if (this.isTouching) {
            if (iScroll.y > 5) {
                pullDownStatus != 2 && this.setState({pullDownStatus: 2});
            } else {
                pullDownStatus != 1 && this.setState({pullDownStatus: 1});
            }
        }
    }
    onScrollEnd(iScroll) {
        this.isTouching = false;

        if (!this.hasMore()) return;

        let {pullDownStatus,pullUpStatus} = this.state;

        // 滑动结束后，停在刷新区域
        if (iScroll.y > -CONTROL_HEIGHT) {
            if (this.state.pullDownStatus <= 1) {   // 没有发起刷新,那么弹回去
                iScroll.scrollTo(0, -CONTROL_HEIGHT, 200);
            } else if (this.state.pullDownStatus == 2) { // 发起了刷新,那么更新状态
                this.setState({pullDownStatus: 3});
                this.fetch(true,this.params);
            }
        }

        // 滑动结束后，停在加载区域
        if (iScroll.y <= iScroll.maxScrollY) {
            if (this.state.pullUpStatus == 1) { // 发起了加载，那么更新状态
                if (this.hasMore) {
                    this.setState({pullUpStatus: 2});
                    this.fetch(false,this.props.params);
                }
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // 列表发生了变化, 那么应该在componentDidUpdate时调用iscroll进行refresh
        this.itemsChanged = nextState.list !== this.state.list;
        return true;
    }

    componentDidUpdate() {
        // 仅当列表发生了变更，才调用iscroll的refresh重新计算滚动条信息
        if (this.itemsChanged) {
            // this.iScrollInstance.refresh();
        }
        return true;
    }
    hasMore() {
        return this.total !== this.state.list.length;
    }
    onRowClick(record, index, event) {
        this.props.onRowClick && this.props.onRowClick.call(this,record,index,event);
        // console.log('record',record);
        // console.log('index',index);
    }
    render() {
        let {data,list,refresh,loading,pullUpStatus,pullDownStatus,init,showCount} = this.state;
        if (init) return null;
        if (!init && !list.length) return <div className="no-results"><span>无搜索结果</span></div>;

        return (
            <div style={{height:this.props.height || CONTENT_HEIGHT,textAlign:'center'}}>
                <ReactIScroll
                    ref="iScroll"
                    iScroll={iScroll}
                    options={options}
                    onScrollStart={this.onScrollStart.bind(this)}
                    onScrollEnd={this.onScrollEnd.bind(this)}
                    onScroll={this.onScroll.bind(this)}>
                    <div>
                    <p style={{marginBottom:25,fontSize:12,color:'#999'}}>{this.pullDownTips[pullDownStatus]}</p>
                    {showCount ? <div style={{fontSize:12,marginTop:5,marginBottom:10}}>共查询到<span style={{color:'#AD2323'}}>{data && data.total}</span>条数据</div> : null}
                    <div onTouchEnd={this.onTouchEnd.bind(this)}>
                        <Table
                            ref="table"
                            columns={this.props.columns}
                            data={this.state.list}
                            rowKey={record => record.id}
                            scroll={{y: false }}
                            onRowClick={this.onRowClick.bind(this)}
                            className='table-style'
                          />
                    </div>
                      <p style={{marginBottom:20,height:40,fontSize:12,color:'#999'}}>{this.pullUpTips[pullUpStatus]}</p>
                    </div>
                    { this.state.fixedThead ? <div className="table-style" style={{position:'fixed',top:164,left:0,right:0}}><table className="rc-table">{htmlToReactParser.parse(this.state.fixedThead.outerHTML)}</table></div> : null}
                </ReactIScroll>
            </div>
        )
    }
}
