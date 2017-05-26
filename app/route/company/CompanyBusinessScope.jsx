/**
 * @Author: tangjingxin <tangduck>
 * @Date:   05/25/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/25/2017
*/

import React from 'react';
import qs from 'query-string';

export default class CompanyBusinessScope extends React.Component {
    constructor(props) {
      super(props);
      let query = qs.parse(this.props.history.location.search);
      this.content = query.content;
      this.state = {};
    }
    render() {
        return (
            <div className="company-item" style={{marginTop:60}}>
                <div className="company-head">
                    <div className="left">经营范围</div>
                </div>
                <div className="company-body">
                    <p>{this.content}</p>
                </div>
        	</div>
        )
    }
}
