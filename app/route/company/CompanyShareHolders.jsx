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
      this.list = [];
      try {
          this.list = JSON.parse(query.list);
      } catch(err) {
          console.log('err',err);
      }
      this.state = {};
    }
    render() {
        console.log('tttt',this.list);
        return (
            <div className="share-holders">
                <div className="headers">公司股东</div>
                <table>
                    <thead>
                        <tr>
                            <th>股东名称</th>
                            <th>股权比例</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.list.map((item,i)=>(
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.rate}%</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    {
                        this.list.length === 0 ?
                            <tfoot>
                                <tr>
                                    <td rowSpan="2">暂无股权结构</td>
                                    <td></td>
                                </tr>
                            </tfoot> : null
                    }
                </table>
        	</div>
        )
    }
}
