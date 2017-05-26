/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/22/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 03/22/2017
 */

import React from 'react';
import PageListView from '../../logics/PageListView.jsx';
import MessageItem from '../../component/MessageItem.jsx';
import { SwipeAction } from 'antd-mobile';

export default class MessageList extends React.Component {
    // <PageListView uri={'/issuer/list'} params={params} renderRow={this.renderRow} rowCmp={BondItem} doFetch={true}/>
    render () {
        return (
            <div style={{paddingTop:15}}>
                <SwipeAction
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
                  ]}
                  left={[
                    {
                      text: '回复',
                      onPress: () => console.log('回复'),
                      style: { backgroundColor: '#108ee9', color: 'white' },
                    },
                    {
                      text: '取消',
                      onPress: () => console.log('取消'),
                      style: { backgroundColor: '#ddd', color: 'white' },
                    },
                  ]}
                  onOpen={() => console.log('global open')}
                  onClose={() => console.log('global close')}
                >
                    <MessageItem />
                </SwipeAction>
                <MessageItem />
                <MessageItem />
            </div>
        )
    }
}
