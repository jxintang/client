/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/05/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 05/10/2017
*/

import { observable,action } from 'mobx';
import AppState from './AppState';

class ReleaseState extends AppState {}

export default new ReleaseState();
