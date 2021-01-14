import React from 'react';
import './styles/App.scss'
import Layout from "./components/HOC/Layout";
import {Router} from "./components/HOC/Router";
import 'antd/dist/antd.css';

export const App = () => (
    <div className={'App'}>
        <Layout>
            <Router/>
        </Layout>
    </div>
);

// <div className={'Persons'}>
//     <div className="card filters">
//         <div className="card-body">
//             <Form>
//                 <Form.Row>
//                     <Form.Group as={Col} controlId="formGridState">
//                         <Form.Control as="select" onClick={this.sortByIdPlus}>
//                             <option>Sort ascending by id</option>
//                             <option>Sort descending by id</option>
//                             <option>Sort ascending by age</option>
//                             <option>Sort descending by age</option>
//                         </Form.Control>
//                     </Form.Group>
//
//                     <Form.Group as={Col} controlId="search">
//                         <Form.Control type="text" placeholder="Enter Name or Surname" onChange={this.searchHandler} />
//                     </Form.Group>
//                 </Form.Row>
//             </Form>
//         </div>
//     </div>
//     <div className="persons-list">
//         <div className={'card'}>
//             <div className={'card-header'}>
//                 Persons List
//                 <NavLink to={'/add'}><Button variant={'primary'}>Add new</Button></NavLink>
//             </div>
//             <div className={'card-body container-fluid'}>
//                 <div className="row">
//                     {this.state.persons.filter(this.searchingFor(this.state.term)).map((person, index) => {
//                         return (
//                             <Person
//                                 className={'col-lg-3'}
//                                 key={index+person}
//                                 id={person.personId}
//                                 personData={person.personData}
//                             />
//                         )
//                     })}
//                 </div>
//             </div>
//         </div>
//     </div>