/**
 * @Author: tangjingxin <jxintang>
 * @Date:   03/20/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/10/2017
 */

import React from 'react';
import {
	List,
	WhiteSpace,
    Switch,
	Picker
} from 'antd-mobile';
import {get} from '../../logics/rpc';

const Item = List.Item;

const regular_data = [
	[
		{
			label: '提前1天',
			value: 'P1D',
		},
		{
			label: '提前3天',
			value: 'P3D',
		},
		{
			label: '提前5天',
			value: 'P5D',
		},
		{
			label: '提前1周',
			value: 'P1W',
		},
		{
			label: '提前1月',
			value: 'P1M',
		},
		{
			label: '提前3月',
			value: 'P3M',
		},
	]
]

const provisional_data = [
   [
    {
      label: '每月提醒',
      value: 'MONTH',
    },
    {
      label: '每季度提醒',
      value: 'SEASON',
    },
    {
      label: '半年提醒',
      value: 'HALF_YEAR',
    }
   ],
];

export default class SettingNotifications extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          checked:true,
		  setting:null
      };
    }
	componentWillMount() {
		this.fetch();
	}
	async fetch() {
		var data = await get('/me/notify',{method:'POST'});
        this.setState({setting:data.setting});
	}
    async onChange(name,value) {
		let {setting} = this.state;
		setting[name] = value instanceof Array ? value.toString() : value;
        this.setState({setting});
		var data = await get('/me/notify/save',{method:'POST',body:{...setting}});
    }
    render() {
		if (this.state.setting === null) return null;
		let {setting} = this.state;


		// <Item extra={<Switch initialValue={true} valuePropName='checked' checked={setting.by_sms} onChange={this.onChange.bind(this,'by_sms')}/>}>
		// 	手机提醒
		// </Item>


		// <List className="my-list" className="my-list" >
		// 	<Item extra={<Switch initialValue={true} valuePropName='checked' checked={setting.notify_provisional} onChange={this.onChange.bind(this,'notify_provisional')}/>}>
		// 		临时报告提醒
		// 	</Item>
		// 	<Picker
		// 		value={typeof setting.notify_provisional_unit === 'string' ? [setting.notify_provisional_unit] : setting.notify_provisional_unit}
		// 		data={provisional_data}
		// 		onChange={v => this.onChange('notify_provisional_unit',v)}
		// 		cascade={false}
		// 		title="设置提醒">
		// 		<Item arrow="horizontal" extra="每月提醒">
		// 			提醒时间设置
		// 		</Item>
		// 	</Picker>
		// </List>
        return (
            <div>
                <WhiteSpace size="xl" />
				<List className="my-list">
                    <Item extra={<Switch initialValue={true} valuePropName='checked' checked={setting.is_notify} onChange={this.onChange.bind(this,'is_notify')}/>}>
                        允许提醒
                    </Item>
				</List>
                <List className="my-list" renderHeader={() => '提醒方式设定'}>
                    <Item extra={<Switch initialValue={true} valuePropName='checked' checked={setting.by_weixin} onChange={this.onChange.bind(this,'by_weixin')}/>}>
                        微信提醒
                    </Item>

                    <Item extra={<Switch initialValue={true} valuePropName='checked' checked={setting.by_email} onChange={this.onChange.bind(this,'by_email')}/>}>
                        邮箱提醒
                    </Item>
                </List>
				<List className="my-list" renderHeader={() => '提醒方式设定'}>
                    <Item extra={<Switch initialValue={false} valuePropName='unchecked' checked={setting.notify_regular} onChange={this.onChange.bind(this,'notify_regular')} />}>
                        定期报告提醒
                    </Item>
					<Picker
						value={typeof setting.notify_regular_in_advance === 'string' ? [setting.notify_regular_in_advance] : setting.notify_regular_in_advance}
						data={regular_data}
						onChange={v => this.onChange('notify_regular_in_advance',v)}
						cascade={false}
						title="设置提醒" >
	                    <Item arrow="horizontal" extra="提前3天">
	                        提醒时间设置
	                    </Item>
					</Picker>
                </List>
				<WhiteSpace size="xl" />
            </div>
        )
    }
}
