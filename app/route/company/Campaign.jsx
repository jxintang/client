/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/07/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/25/2017
*/

import React from 'react';
import Dialog from 'rc-dialog';
import GridList from 'component/GridList.jsx';
import all_data from '../../province-city.json';
import _ from 'lodash';
import {TABBAR_HEIGHT,CONTENT_HEIGHT,NAV_HEIGHT} from '../const';

const data = {
    cmpType:'radio-box',
    paramsType:'name1',
    list:[]
}

export default class Campaign extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          visible:true,
      };
    }
    componentWillMount() {
        this.initialize();
    }
    setParams(v) {
        console.log('province',v)
        // this.setState({province:v});
        this.props.history.push('/company1/list?province=' + v);
    }
    initialize() {
        let provinces = Object.keys(_.groupBy(all_data, 'name'));
        for (let i = 0;i < provinces.length;i++) {
            let item = provinces[i];

            let name = '';
            if (item.indexOf('自治区') > -1) {
                name = item.indexOf('内蒙古') > -1 ? item.substr(0,3) : item.substr(0,2)
            } else {
                name = item;
            }

            data.list.push({
                val:item,
                name
            })
        }
        this.setState({provinces});
    }
    render() {
        let {visible} = this.state;
        return (
            <Dialog wrapClassName="company-filter filter-wrapper-style" visible={this.state.visible} closable={false} maskStyle={{top: 44}} zIndex={998}>
                <div style={{maxHeight:CONTENT_HEIGHT-TABBAR_HEIGHT-NAV_HEIGHT,overflow:'scroll'}}>
                    <GridList data={data} onClick={(v) => {
                        this.setParams(v);
                    }}/>
                </div>
            </Dialog>
        )
    }
}
