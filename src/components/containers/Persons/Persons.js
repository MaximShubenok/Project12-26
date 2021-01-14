import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import axios from 'axios'
import {URI} from "../../../api/v1";
import {Table, Button, Input, Select, DatePicker} from "antd";
import validator from 'validator';

const Persons = () => {

    const [persons, setPersons] = useState([]);
    const [term, setTerm] = useState('');
    const [shown, setShown] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [born, setBorn] = useState('');
    const [department, setDepartment] = useState('IT');

    const history = useHistory();

    useEffect(() => {
        const renderData = async () => {
            try {
                const response  = await axios.get(`${URI}/persons.json`);

                const data = Object.entries(response.data).map((person) => {
                    return {
                        ...person[1],
                        id: person[0]
                    }
                });

                setPersons(data)
            } catch (e) {
                console.log(e)
            }
        };

        renderData();
    }, []);

    const searchHandler = event => {
        setTerm(event.target.value)
    };

    const searchingFor = term => {
        return function(x) {
            return (x.name.toLowerCase().includes(term.toLowerCase())) || (x.surName.toLowerCase().includes(term.toLowerCase())) || !term
        }
    };

    const deletePerson = async (id) => {
        try {
            await axios.delete(`${URI}/persons/${id}.json`);
            history.go(0)
        } catch (e) {
            console.log(e)
        }
    };

    const goToEdit = (record) => {
        history.push({
            pathname: `/edit/${record.id}`,
            state: {
                id : record.id,
                name: record.name,
                surname: record.surName,
                patronymic: record.patronymic,
                born: record.born,
                email: record.email,
                phone: record.phone,
                department: record.department
            }
        });
    };

    const getAge = require('get-age');

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id.localeCompare(b.id),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Surname',
            dataIndex: 'surName',
            key: 'surName',
        },
        {
            title: 'Patronymic',
            dataIndex: 'patronymic',
            key: 'patronymic',
        },
        {
            title: 'Age',
            dataIndex: 'born',
            key: 'born',
            render: text => <p style={{marginBottom: 0}}>{getAge(text)}</p>,
            sorter: (a, b) => getAge(a.born) - getAge(b.born),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record) => (
                <div key={record.id}>
                    <Button style={{marginRight: 20}} variant={'primary'} onClick={() => goToEdit(record)}>Edit {record.name + " " + record.surName}</Button>
                    <Button variant={'danger'} onClick={() => deletePerson(record.id)}>Delete</Button>

                </div>
            ),
        },
    ];

    const changeShown = () => {
        setShown(!shown)
    };

    const { Option } = Select;

    const isPhone = validator.isMobilePhone(phone);

    const addNewPerson = async () => {
        try {
            await axios.post(`${URI}/persons.json`, {
                name,
                surName: surname,
                patronymic,
                born,
                email,
                phone,
                department
            });

            history.go(0)
        } catch (e) {
            console.log(e)
        }
    };

    const validate =
        !isPhone || name === '' || surname === '' || patronymic === '' || born === '' || email === '' || department === '';

    return (
        <div>
            <Input type="text" style={{marginTop: 20}} placeholder={'Enter the name of surname to search'} onChange={searchHandler}/>

            <Table dataSource={persons.filter(searchingFor(term))} columns={columns} />

            <Button variant={'primary'} onClick={changeShown}>Add new person</Button>

            {shown ?
                <div className={'Form'}>
                    <h3>Add new person</h3>
                    <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                    <Input placeholder="Surname" value={surname} onChange={e => setSurname(e.target.value)} />
                    <Input placeholder="Patronymic" value={patronymic} onChange={e => setPatronymic(e.target.value)} />
                    <DatePicker placeholder="Born date"  value={born} onChange={(dateString) => setBorn(dateString)} />
                    <Input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} type={'number'} />
                    <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} type={'email'} />
                    <Select value={department} style={{ width: '100%' }} onChange={(value) => setDepartment(value)}>
                        <Option value="IT">IT</Option>
                        <Option value="Sales">Sales</Option>
                        <Option value="Delivery">Delivery</Option>
                        <Option value="Legal">Legal</Option>
                    </Select>
                    {!validate ?
                        <Button variant={'primary'} onClick={addNewPerson}>Send data</Button> :
                        <Button variant={'primary'} disabled>Send data</Button>
                    }
                </div> : null
            }
        </div>
    );
};

export default Persons;