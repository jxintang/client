/**
 * @Author: tangjingxin <jxintang>
 * @Date:   03/17/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/20/2017
 */

// 横向table组件
import React from 'react';
import '../static/css/row-table.scss';

const RowTable =({rows,data,style,className}) => (
    <table className={(className || "") +" row-table"} style={style}>
        <thead></thead>
        <tbody>
            {
                rows.map((item,index)=>(
                    <tr key={index}>
                        <td>{item.title}</td>
                        <td>{item.render ? item.render(data[item.key],data[item.key1]) : (data[item.key] !== null ? data[item.key] : '--')}</td>
                    </tr>
                ))
            }
        </tbody>
        <tfoot></tfoot>
    </table>
)

export default RowTable;
