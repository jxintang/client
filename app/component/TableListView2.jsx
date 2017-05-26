/**
 * @Author: tangjingxin <tangduck>
 * @Date:   04/19/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified time: 04/19/2017
*/


"use strict";

// var ExampleImage = require('./helpers/ExampleImage');
var FakeObjectDataListStore = require('./datastore');
var FixedDataTable = require('fixed-data-table');
var React = require('react');
import 'fixed-data-table/dist/fixed-data-table.min.css';

const {Table, Column, Cell} = FixedDataTable;

const DateCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[col].toLocaleString()}
  </Cell>
);


const LinkCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    <a href="#">{data.getObjectAt(rowIndex)[col]}</a>
  </Cell>
);

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[col]}
  </Cell>
);

class ObjectDataExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
    };
  }

  render() {
    var {dataList} = this.state;
    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataList.getSize()}
        width={375}
        height={500}
        {...this.props}>
        <Column
          header={<Cell>First Name</Cell>}
          cell={<LinkCell data={dataList} col="firstName" />}
          fixed={true}
          width={50}
        />
        <Column
          header={<Cell>Last Name</Cell>}
          cell={<TextCell data={dataList} col="lastName" />}
          fixed={true}
          width={50}
        />
        <Column
          header={<Cell>City</Cell>}
          cell={<TextCell data={dataList} col="city" />}
          width={50}
        />
        <Column
          header={<Cell>Street</Cell>}
          cell={<TextCell data={dataList} col="street" />}
          width={100}
        />
        <Column
          header={<Cell>Zip Code</Cell>}
          cell={<TextCell data={dataList} col="zipCode" />}
          width={100}
        />
        <Column
          header={<Cell>Email</Cell>}
          cell={<LinkCell data={dataList} col="email" />}
          width={100}
        />
        <Column
          header={<Cell>DOB</Cell>}
          cell={<DateCell data={dataList} col="date" />}
          width={100}
        />
      </Table>
    );
  }
}

module.exports = ObjectDataExample;


// const React = require('react');
// const {Table, Column, Cell} = require('fixed-data-table');
// import 'fixed-data-table/dist/fixed-data-table.min.css';
//
// class MyTable extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       myTableData: [
//         {name: 'Rylan'},
//         {name: 'Amelia'},
//         {name: 'Estevan'},
//         {name: 'Florence'},
//         {name: 'Tressa'},
//       ],
//     };
//   }
//
//   render() {
//     return (
//       <Table
//         rowsCount={this.state.myTableData.length}
//         rowHeight={50}
//         headerHeight={50}
//         width={375}
//         height={500}>
//         <Column
//           header={<Cell>Name</Cell>}
//           cell={props => (
//             <Cell {...props}>
//               {this.state.myTableData[props.rowIndex].name}
//             </Cell>
//           )}
//           width={80}
//         />
//       </Table>
//     );
//   }
// }
//
// export default MyTable;
