/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/07/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/21/2017
*/
import React from 'react';
import {Link} from 'react-router-dom';
import { observer } from 'mobx-react';
import navState from '../mobx/NavState';

@observer
class RightCmp extends React.Component {
    render() {
        let {right,event,pathname} = this.props;
        return (
            <div className="nav-right">
                {right && right.map((item,index)=>{
                    let {icon,title,path} = item;
                    if (title instanceof Array) {
                        title = typeof navState.stateMap[pathname] === 'number' ? title[navState.stateMap[pathname]] : "";
                    }
                    if (icon) {
                        if (path) {
                            return <Link key={index} className={icon} to={path}></Link>
                        } else if (event) {
                            return <div key={index} className="nav-right-cmp" onTouchTap={event}></div>
                        }
                    } else if (title) {
                        return <div key={index} className="nav-right-title" onTouchTap={event}>{title}</div>
                    }
                })}
            </div>
        )
    }
}

export default RightCmp;
