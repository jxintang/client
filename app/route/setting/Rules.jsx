/**
 * created by jxintang on 3/19/17.
*/

import React from 'react';
import {
	List,
    Switch,
    WhiteSpace
} from 'antd-mobile';

const Item = List.Item;

export default class SettingRules extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          checked:true
      };
    }
    onChange(bool) {
        this.setState({checked:bool})
    }
    render() {
        return (
            <div>
                <WhiteSpace size="xl" />
                <List className="my-list">
                    <Item extra={<Switch initialValue={false} valuePropName='unchecked' checked={this.state.checked} onChange={this.onChange.bind(this)} />}>
                        定期报告提醒
                    </Item>
                    <Item arrow="horizontal" extra="提前3天">
                        提醒时间设置
                    </Item>
                    <Item arrow="horizontal" extra="永不">
                        重复
                    </Item>
                </List>
                <WhiteSpace size="xl" />
                <div>
                    <List className="my-list">
                        <Item extra={<Switch initialValue={true} valuePropName='checked'/>}>
                            临时报告提醒
                        </Item>
                        <Item arrow="horizontal" extra="每月提醒">
                            提醒时间设置
                        </Item>
                        <Item extra={<Switch />}>
                            评论变化提醒
                        </Item>
                    </List>
                </div>
            </div>
        )
    }
}
