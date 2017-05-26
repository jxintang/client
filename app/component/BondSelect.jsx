/**
 * @Author: tangjingxin <tangduck>
 * @Date:   03/15/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/25/2017
 */

import React from 'react';
import { observer } from 'mobx-react';
import '../static/css/city-select.scss';
import all_data from '../province-city.json';
import issuerState from '../mobx/IssuerState';
import _ from 'lodash';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import {getStorage,setStorage} from '../logics/rpc';

const options = {
	useTransition: true,
	bounce: false
}

const ITEM_HEIGHT = 40;

const DATA = [{
    name:'企业债',
    list:['一般企业债','集合企业债']
},{
    name:'金融债',
    list:['政策银行债','商业银行债','商业银行次级债','保险公司债','证券公司债','证券公司短期融资券','其它金融机构债']
},{
    name:'公司债',
    list:['一般公司债','私募债']
},{
    name:'中期票据',
    list:['一般中期票据','集合票据']
},{
    name:'短期融资券',
    list:['一般短期融资券','超短期融资券']
},{
    name:'定向工具',
    list:[]
}]

@observer
export default class BondSelect extends React.Component {
	constructor(props) {
		super(props);
		this.data = null;

		try {
			this.storage = getStorage(this.props.storage);
		} catch(err) {
			console.log('err',err);
		}

		this.state = {
            selectedItem: this.storage.name2_list || [],
            selectedName: this.storage.name1_list || '',
            name:this.storage.selectedName || DATA[0].name
		};
	}
	componentDidMount() {
		let self = this,
			requestParams = {},
			{event} = this.props;;

		event && this.eventHandler(event);
	}
	componentWillReceiveProps(nextProps) {
		let {event} = nextProps;
        event && this.eventHandler(event);
	}
	eventHandler(event) {
		let {selectedName,selectedItem} = this.state;
		let {mobxState} = this.props;
		if (event === 'submit') {
			mobxState.setParams({
				name1_list: selectedName,
				name2_list: selectedItem
			});
		} else if (event === 'reset') {
			mobxState.setParams({
				name1_list: [],
				name2_list: []
			});

			this.setState({
				name1_list: [],
				name2_list: [],
				selectedItem: [],
				selectedName: ''
			})
		}

	}
    onBondSelect(name) {
        this.setState({name});
    }
    onItemSelect(name) {
        let {selectedItem,selectedName} = this.state,
            {storage} = this.props,
            Bond = DATA.filter((item)=> item.name === this.state.name);
        if (selectedItem.indexOf(name) > -1) {
            selectedItem = selectedItem.filter((item)=> item !== name);
            selectedName = [];
        } else {
            selectedItem.push(name);
            selectedName = Bond.length && Bond[0].list.length === selectedItem.length ? [this.state.name] : [];
        }

        this.setState({selectedItem,selectedName});
        setStorage(storage,{name1_list:selectedName,name2_list:selectedItem},'merge');
    }
    onItemSelectAll(name) {
        let {selectedItem,selectedName} = this.state,
            {storage} = this.props,
            tmp = [];

        let Bond = DATA.filter((item)=> item.name === name);
        selectedItem = [];
        if (selectedName[0] === name) {
            selectedName = [];
        } else {
            if (Bond.length) {
                selectedItem = selectedItem.concat(Bond[0].list);
            }

            selectedName = [name];
        }


        this.setState({selectedItem,name,selectedName});
        setStorage(storage,{name2_list:selectedItem,name,name1_list:selectedName},'merge');
    }
	render() {
		let {name,selectedItem,selectedName} = this.state;
		return (
			<div className="bond-select">
                {this.props.hideTitle ? null : <div className="title">债券类别</div>}
				<div className="scroll-area">
					<div className="left">
						<ReactIScroll
							ref="iScroll"
							iScroll={iScroll}
							options={options}>
							<ul>
                                {DATA.map((item)=> (
                                    <li key={item.name} className={name === item.name ? 'active' : ''} onTouchTap={this.onBondSelect.bind(this,item.name)}>
                                        <span>{item.name}</span>
                                    </li>
                                ))}
							</ul>
						</ReactIScroll>
					</div>
					<div className="right">
						<ReactIScroll iScroll={iScroll} onScrollStart={this.onScrollStart}>
							<ul>
                                {DATA.map((item)=>{
                                    if (item.name === name) {
                                        return ['全选',...item.list].map((i,index)=>(
                                            <li onTouchTap={index === 0 ? this.onItemSelectAll.bind(this,name) : this.onItemSelect.bind(this,i)} className={(index === 0 && name === selectedName[0]) || selectedItem.indexOf(i) > -1 ? 'active' : ''}>
                                                <i className="check-box"></i>
                                                <label>{i}</label>
                                            </li>
                                        ))
                                    }
                                })}
							</ul>
						</ReactIScroll>
					</div>
					<div className="clear"></div>
				</div>
			</div>
		)
	}
}
