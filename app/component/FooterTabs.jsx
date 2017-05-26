/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/22/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 03/22/2017
 */

import React from 'react';
import '../static/css/footer-tabs.scss';

export default class FooterTabs extends React.Component {
    render () {
        return (
            <div className="footer-tabs">
                <div className="tab-item"><div className="tab-item-inner">设置提醒</div></div>
                <div className="tab-item selected">关联债券</div>
            </div>
        )
    }
}
