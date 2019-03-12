import React from 'react';
import { shallow } from 'enzyme';
import ProductTable from '../productTable';
import Table from '@material-ui/core/Table';
 
const ToDoList = (props) => {
  return (
    <ul>
      {
        props.tasks.map((taskName, index) =>
          <li key={index}>{taskName}</li>
        )
      }
    </ul>
  )
};

describe('ToDoList component', () => {
  describe('when provided with an empty array of tasks', () => {
    it('contains an empty <ul> element', () => {
      const toDoList = shallow(<ToDoList tasks={[]}/>);
      expect(toDoList).toContainReact(<ul/>);
    })
    it('does not contain any <li> elements', () => {
      const toDoList = shallow(<ToDoList tasks={[]}/>);
      expect(toDoList.find('li').length).toEqual(0);
    })
  });
 
  describe('when provided with an array of tasks', () => {
    it('contains a matching number of <li> elements', () => {
      const tasks = ['Wash the dishes', 'Make the bed'];
      const toDoList = shallow(<ToDoList tasks={tasks}/>);
      expect(toDoList.find('li').length).toEqual(tasks.length);
    })
  });
});


// describe('ProductTable component', () => {
//   describe('when provided with a list of products', () => {
//     it('contains a table elements', () => {
//       // arange
//       const mockProducts = [
//         {
//           "_id" : "5c6962c7dea72f39a079fb04",
//           "inStock" : 4,
//           "sold" : 0,
//           "publish" : true,
//           "images" : [],
//           "name" : "Brunswick 7-foot Billiard Table",
//           "used" : false,
//           "description" : "Brunswick 7-foot Billiard table for your family fun time.",
//           "price" : "699.00"
//         },
//         {
//           "_id" : "5c6962c7dea72f39a079fb04",
//           "inStock" : 4,
//           "sold" : 0,
//           "publish" : true,
//           "images" : [],
//           "name" : "American Classic Billiard Table",
//           "used" : false,
//           "description" : "Classic 7-foot Billiard table for your family fun time.",
//           "price" : "899.00"
//         }
//       ]
//       const wrapper = shallow(<ProductTable products={mockProducts} />)

//       expect(wrapper).toContainReact(<Table />);
//     })
//   })
// });