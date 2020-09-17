/**
 * Created by chalosalvador on 9/16/20
 */
import React, { useState } from 'react';
import { Form, Select } from 'antd';
import { useCareersList } from '../data/useCareersList';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 18 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const AssignTeacherForm = ( { onSubmit, form, teacherId } ) => {
  const { careers, isLoading, isError, mutate } = useCareersList();
  const [ currentTeachers, setCurrentTeachers ] = useState( [] );
  console.log( 'careers', careers );
  const handleChangeCareer = ( value ) => {
    form.setFieldsValue( { teacherId: null } );
    setCurrentTeachers( careers[ value ].teachers );
  };

  return (
    <Form form={ form } { ...formItemLayout }
          name='assign-teacher' initialValues={ teacherId }
          onFinish={ onSubmit }>
      <Form.Item name='career_id' label='Carrera' rules={ [
        {
          required: true,
          message: 'Selecciona una carrera...'
        },
      ] }>
        <Select placeholder='Selecciona...' onChange={ handleChangeCareer } loading={ isLoading }>
          { careers.map( ( career ) => <Option value={ career.id }>{ career.name }</Option> ) }
        </Select>
      </Form.Item>

      <Form.Item name='teacherId' label='Profesor' rules={ [
        {
          required: true,
          message: 'Selecciona un profesor...'
        },
      ] }>
        <Select placeholder='Selecciona...' loading={ isLoading }>
          { currentTeachers.map( ( career ) => <Option value={ career.id }>{ career.name }</Option> ) }
        </Select>
      </Form.Item>
    </Form>
  );
};

export default AssignTeacherForm;
