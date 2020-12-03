import React, {useState} from 'react';
import {Form, Input, Select, Button} from 'antd';
import {useFacultiesList} from '../data/useFacultiesList'


const Faculties = () => {

    const faculties = useFacultiesList(); 
    console.log(faculties);
    return (
        <>
        <h3>FACULTADES</h3>
        </>
    )
}

export default Faculties;