/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/22/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 03/22/2017
 */

import React from 'react';
import '../static/css/message-item.scss';

const MessageItem = ({data})=> (
    <div className="message-item">
        <div className="message-item-header">
            厦门市政CP001
        </div>
        <div className="message-item-content">
            <p>按照《中债收益率曲线和中债估值最终用户服务协议》的约定，请已签约的中债信息产品最终用户...</p>
            <div className="date">2016-11-22</div>
        </div>
    </div>
)

export default MessageItem;
