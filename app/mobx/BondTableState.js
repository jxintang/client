/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/10/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/10/2017
*/

import { observable,action } from 'mobx';
import AppState from './AppState';

class BondTableState extends AppState {}

export default new BondTableState();
