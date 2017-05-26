/**
 * created by jxintang on 2/23/17.
 */
import React from 'react';
import '../../static/css/creditor/creditor-item.scss';

export default class CreditorItem extends React.Component {
	render() {
		return (
			<div className="swiper-slide">
				<div className="creditor-item">
    				<div className="creditor-header">
                        云南省工业投资控股集团非公开发行公司债券（第一期）
                    </div>
                    <div className="creditor-content">
                        <table>
                            <tbody>
                                <tr>
                                    <td>简称：16云工 </td>
                                    <td>代码：118794.SZ</td>
                                </tr>
                                <tr>
                                    <td colSpan="2">发行人：云南省工业投资控股集团</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="button">关注</div>
                    </div>
                </div>
			</div>
		)
	}
}
