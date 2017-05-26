/**
 * @Author: tangjingxin <tangduck>
 * @Date:   05/09/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/26/2017
*/

import React from 'react';
import {isDropDownPage} from 'logics/rpc';

const USER_GUIDANCE = 'user-guidance';
const USER_ANI = 'user-animation';
const STORAGE_MAINRELEASE_NAME = 'main-release-name1';

class Mask extends React.Component {
    constructor(props) {
      super(props);

      let {history} = this.props;

	  this.state = {
          showAni: localStorage.getItem(USER_ANI) === null && (['/bond/main-release'].indexOf(history.location.pathname) !== -1 || this.props.showAni),
          showDevBar: true,
		  showMsk: localStorage.getItem(USER_GUIDANCE),
		  isDropDownPage: isDropDownPage(history.location.pathname),
	  };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            showMsk: localStorage.getItem(USER_GUIDANCE),
            showAni: localStorage.getItem(USER_ANI) === null && (['/bond/main-release'].indexOf(nextProps.history.location.pathname) !== -1 || nextProps.showAni),
        })
    }
    close(e) {
        e.preventDefault();
		this.setState({showMsk:false});
		localStorage.setItem(USER_GUIDANCE,'false');
	}
	closeAni(e) {
        e.preventDefault();
		this.setState({showAni:false});
		localStorage.setItem(USER_ANI,'false');
	}
    render() {
        let {showMsk,isDropDownPage,showAni,showDevBar} = this.state;
		let {history} = this.props;

        if (showMsk === null && isDropDownPage) {
			return (
				<div className="g-mask g-mask-no-opacity">
					<svg viewBox="0 0 100% 100%" width="100%" height="100%">
					  <defs>
						<mask id="mask" x="0" y="0" width="100%" height="100%">
						  <rect x="0" y="0" width="100%" height="100%" fill="#fff"/>
						  <rect x="100" y="4" width="94" height="35" rx="2" ry="2"/>
						</mask>
					  </defs>
					  <rect x="0" y="0" width="100%" height="100%" mask="url(#mask)" fillOpacity="0.7"/>
					</svg>
					<img src="/static/images/mask-bg@2x.png" height="129" width="179"/>
					<div className="g-mask-btn" onTouchTap={(e)=>this.close(e)}>{showAni ? '下一步' : '我知道了'}</div>
				</div>
			)
		} else if (showAni) {
			return (
				<div className="g-mask g-mask-opacity">
					<div className="g-finger-box">
						<div className="finger-gesture"></div>
						<div className="finger-text">向左滑动查看更多信息</div>
						<div className="g-mask-btn" onTouchTap={(e)=>this.closeAni(e)}>我知道了</div>
					</div>
				</div>
			)
		} else {
            // TODO 上线打开注释
            if (__DEV__ && sessionStorage.getItem('show-dev-bar') === null && showDevBar) {
            // if (sessionStorage.getItem('show-dev-bar') === null && showDevBar) {
                return (
                    <div style={{position:'absolute',left:0,top:0,height:44,lineHeight:'44px',width:'100%',backgroundColor:'yellow',textAlign:'center',zIndex:9999,fontSize:12}} >
                        是否要清除本地数据？
                        <button style={{border:'1px solid red',backgroundColor:'red',marginLeft:10,color:'#fff'}} onTouchTap={()=>{localStorage.removeItem(USER_GUIDANCE);localStorage.removeItem(USER_ANI);localStorage.removeItem(STORAGE_MAINRELEASE_NAME);alert('清除成功');sessionStorage.setItem('show-dev-bar',false);this.setState({showDevBar:false});window.location.reload();}}>确定清除</button>
                        <button style={{border:'1px solid red',backgroundColor:'red',marginLeft:10,color:'#fff'}} onTouchTap={()=>{sessionStorage.setItem('show-dev-bar',false);this.setState({showDevBar:false})}}>暂不显示</button>
                    </div>
                )
            } else {
                return null
            }

		}
    }
}

export default Mask;
