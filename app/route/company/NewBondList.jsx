/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/06/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/10/2017
*/

import React from 'react';
import {
	Tabs,
    SearchBar,
    Popup
} from 'antd-mobile';
import NewBondItem from '../../component/NewBondItem.jsx';
import PageListView from '../../logics/PageListView.jsx';
import navState from '../../mobx/NavState';
import '../../static/css/newbond.scss';

let maskProps;
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);

if (isIPhone) {
  maskProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

const showPopup = (e) => {
	e.preventDefault(); // 修复 Android 上点击穿透
	Popup.show(
        <div className="newbond-popup">
            <a className="columns" href="tel:1235555666">
                <i className="newbond-publish-icon"></i>
                <h6>发布新债券</h6>
            </a>
            <a className="columns" href="tel:1235555666">
                <i className="newbond-publish-icon"></i>
                <h6>发布新活动</h6>
            </a>
            <a className="columns" href="tel:1235555666">
                <i className="activity-publish-icon"></i>
                <h6>发布企业宣传</h6>
            </a>
            <i className="popup-close-icon"></i>
        </div>,
        { animationType: 'slide-up', maskProps, maskClosable: false });
}

const TabPane = Tabs.TabPane;

const PageListViewCmp = ({category,keyword,doFetch}) => (
    <div className='activity-wrapper'>
        <PageListView uri={'/company/newbond/list'} params={{category,keyword}} rowCmp={NewBondItem} doFetch={doFetch} offsetHeight={70}/>
    </div>
);

const categoryList = ['短融中票','企业债','公司债'];
const categoryList1 = ['短融中票PPN','企业债','公司债'];

export default class NewBondList extends React.Component {
    constructor(props) {
      super(props);

      this.state = {category:categoryList[0],keyword:'',doFetch:true};
    }
    componentWillMount() {
		// 暂时去掉发布按钮
        // navState.addEventListener('/company1/new',(e)=>{showPopup(e)});
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
                    {categoryList1.map((item,index)=>(
                        <TabPane tab={item} key={index}>
                            <PageListViewCmp category={category} keyword={keyword} doFetch={doFetch}/>
                        </TabPane>
                    ))}
                </Tabs>
            </div>
        )
    }
}
