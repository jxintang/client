/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/11/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/18/2017
*/

import React from 'react';
import {browserHistory} from 'react-router';
import {
    Button,
    Toast,
} from 'antd-mobile';
import RowTable from '../../component/RowTable.jsx';
import '../../static/css/like-list.scss';
import {get} from '../../logics/rpc';

const rows = [
    {
        title:'简称：',
        key:'abbrev_name'
    },
    {
      title:'债券期限：',
      key:'term_in_year',
      key1:'special_term',
      render:(term, sterm)=>(<div>{term}年{sterm?`(${sterm})`:''}</div>)
    },
    {
        title:'发行总额：',
        key:'issue_actual_amount',
		render: (name,name0)=> {
            return (
				<div>{name ? name + '亿' : ''}</div>
			)
        }
    },
    {
        title:'发行日期：',
        key:'issue_start_date'
    }
];

class LikeList extends React.Component {
    constructor(props) {
       super(props);

       this.state = {
           followList:[], // followList,存储id
           data: null
       }
    }
   componentWillMount() {
       this.setState({
           data:this.context.router.route.location.state.data
       })
   }
   async followToggle(id,e) {
       e && e.preventDefault();
       let {followList} = this.state;
       var data = await get('/bond_follow/toggle',{method:'POST',body:{bond_id:id}});
       this.setState({isFollow:data.is_follow});
       if (data.is_follow) {
           followList.push(id);
       } else {
           followList = followList.filter((item) => item !== id);
       }
       this.setState({followList});
       typeof(data.is_follow) !== 'undefined' && Toast.info(data.is_follow ? '关注成功' : '取消关注成功', 1);
   }
   render() {
        let {data,followList} = this.state;
        if (data === null) return null;
        return (
            <div style={{marginTop:60,marginBottom:45}}>
                <div style={{textAlign:'center',padding:'0 0 15px',fontSize:14,color:'#999'}}>共找到<span style={{color:'#AD2323'}}>{data.length}</span>只债券</div>
                {
                    data.map((item)=> (
                        <div className="like-list-item">
                            <div className="fl">
                                <RowTable className="row-table-intro" rows={rows} data={item} />
                            </div>
                            <div className="fr">
                                <Button size="small" inline className="follow-btn" onTouchTap={this.followToggle.bind(this,item.id)}>{followList.indexOf(item.id) > -1 ? '取消关注' : '关注'}</Button>
                            </div>
                            <div style={{clear:'both'}}></div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

LikeList.contextTypes = {
   router: React.PropTypes.object.isRequired
};

export default LikeList;
