/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/05/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/02/2017
*/

import React from 'react';
import {
	Tabs,
    SearchBar,
} from 'antd-mobile';
import ActivityItem from 'component/ActivityItem.jsx';
import PageListView from 'logics/PageListView.jsx';

const TabPane = Tabs.TabPane;

const PageListViewCmp = ({category,keyword,doFetch}) => (
    <div className='activity-wrapper'>
        <PageListView uri={'/company/activity/list'} params={{category,keyword}} rowCmp={ActivityItem} doFetch={doFetch} offsetHeight={54}/>
    </div>
);

const categoryList = ['调研','路演','会议','其他'];

export default class Activity extends React.Component {
    constructor(props) {
      super(props);

      this.state = {category:categoryList[0],keyword:'',doFetch:true};
    }
    callback(index) {
        this.setState({category:categoryList[index]});
    }
    onChange(keyword) {
        this.setState({keyword,doFetch:false});
    }
    onSubmit(keyword) {
        this.setState({keyword,doFetch:true});
    }
    render() {
        let {category,keyword,doFetch} = this.state;
        return (
            <div>
                <SearchBar value={keyword} onSubmit={this.onSubmit.bind(this)} onChange={this.onChange.bind(this)} onCancel={this.onSubmit.bind(this,'')} placeholder="请输入关键字搜索"/>
                <Tabs defaultActiveKey="0" swipeable={false} onChange={this.callback.bind(this)} destroyInactiveTabPane={true}>
                    {['调研','路演','会议','其他'].map((item,index)=>(
                        <TabPane tab={item} key={index}>
                            <PageListViewCmp category={category} keyword={keyword} doFetch={doFetch}/>
                        </TabPane>
                    ))}
                </Tabs>
            </div>
        )
    }
}
