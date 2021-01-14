import React, {useState} from 'react';
import {Button, DatePicker, Input, Select} from "antd";
import validator from "validator";
import {useLocation, useHistory} from 'react-router-dom';
import axios from "axios";
import {URI} from "../../../api/v1";

export const Edit = () => {

    const location = useLocation();
    const history = useHistory();

    const data = location.state;

    const [name, setName] = useState(data.name);
    const [surname, setSurname] = useState(data.surname);
    const [patronymic, setPatronymic] = useState(data.patronymic);
    const [phone, setPhone] = useState(data.phone);
    const [email, setEmail] = useState(data.email);
    const [born, setBorn] = useState(data.born);
    const [department, setDepartment] = useState(data.department);

    // const getAge = require('get-age');

    const { Option } = Select;

    const isPhone = validator.isMobilePhone(phone);

    const deletePerson = async () => {
        try {
            await axios.delete(`${URI}/persons/${data.id}.json`);
            history.push('/')
        } catch (e) {
            console.log(e)
        }
    };

    const editPerson = async () => {
        try {
            await axios.put(`${URI}/persons/${data.id}.json`, {
                name,
                surName: surname,
                patronymic,
                born,
                phone,
                email,
                department
            });
            history.push('/')
        } catch (e) {
            console.log(e)
        }
    };

    const validate =
        !isPhone || name === '' || surname === '' || patronymic === '' || born === '' || email === '' || department === '';

    return (
        <div className={'Edit'}>
            <div className={'Form'}>
                <h3>Edit person</h3>
                <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <Input placeholder="Surname" value={surname} onChange={e => setSurname(e.target.value)} />
                <Input placeholder="Patronymic" value={patronymic} onChange={e => setPatronymic(e.target.value)} />
                <DatePicker placeholder={born} onChange={(dateString) => setBorn(dateString)} />
                <Input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} type={'number'} />
                <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} type={'email'} />
                <Select value={department} style={{ width: '100%' }} onChange={(value) => setDepartment(value)}>
                    <Option value="IT">IT</Option>
                    <Option value="Sales">Sales</Option>
                    <Option value="Delivery">Delivery</Option>
                    <Option value="Legal">Legal</Option>
                </Select>
                {!validate ?
                    <Button variant={'primary'} onClick={editPerson}>Update data</Button> :
                    <Button variant={'primary'} disabled>Update data</Button>
                }

                <Button onClick={deletePerson}>Delete person</Button>
            </div>
        </div>
    )
}