/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/01/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/04/2017
 */

import React from 'react';
import {ImagePicker} from 'antd-mobile';
import {get} from '../../logics/rpc';


const data = [];

function change1(input) {
    console.log('files',input.files);
}
export default class InfoUpload extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          files:data
      };
    }
    componentDidMount() {
    }
    async onChange(files, type, index) {
       if (type === 'add' && files.length) {

           var data = new FormData();
           data.append('file',files[0].file);
           let data1 = await get('/me/info/upload', {
               type: 'image',
               body: data
           });
       }

       this.setState({
           files,
       });
    }
    render() {
        let {files} = this.state;
        return (
            <div>
                <ImagePicker
                  files={files}
                  onChange={this.onChange.bind(this)}
                  onImageClick={(index, fs) => console.log(index, fs, 'tttt')}
                  selectable={files.length < 2}
                />
            </div>
        )
    }
}
