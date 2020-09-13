/**
 * Created by chalosalvador on 9/11/20
 */
import React, { useState } from 'react';
import { Alert, Form, Button, Input, DatePicker, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useAuth } from '../providers/Auth';

const { RangePicker } = DatePicker;

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
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 18,
      offset: 6
    },
  },
};

const ReportStudentSectionForm = ( { form, onSubmit, ...props } ) => {
  const { currentUser } = useAuth();
  const [ isFinalReport, setIsFinalReport ] = useState( false );

  const disabledDate = ( current ) => current && current > moment().endOf( 'day' );
  const handleChangeHoursWorked = ( hours ) => {
    const total_hours = currentUser.hours_registered + currentUser.hours_approved;
    const sum_hours = total_hours + hours;
    setIsFinalReport( sum_hours >= 480 );
    form.setFieldsValue( {
      type: sum_hours > 480
        ? 'final'
        : 'partial'
    } );
  };

  return (
    <Form
      { ...formItemLayout }
      onFinish={ onSubmit }
      form={ form }
      name='report'
      initialValues={ !props.report
        ? {
          activities: [ '' ],
          type: 'partial'
        }
        : {
          ...props.report,
          dates: [ moment( props.report.from_date ), moment( props.report.to_date ) ],
          activities: props.report.activities.length > 0
            ? props.report.activities.map( ( activity ) => activity.description )
            : [ '' ]
        } }
      // onValuesChange={(changedValues, allValues)=> console.log( 'changedValues', changedValues )}
      // onFieldsChange={(changedFields, allFields)=> console.log( 'changedFields', changedFields )}
    >
      <Form.Item name='dates' label='Fechas' rules={ [
        {
          required: true,
          message: 'Ingresa las fechas incluidas en este reporte'
        },

      ] }>
        <RangePicker placeholder={ [ 'Inicio', 'Fin' ] }
                     inputReadOnly
                     disabledDate={ disabledDate }
                     format='DD/MM/YYYY' />
      </Form.Item>

      <Form.Item label='Área' name='area' rules={ [
        {
          required: true,
          whitespace: true,
          message: 'Selecciona el área de la empresa donde desarrollaste tus actividades.'
        }
      ] }>
        <Input />
      </Form.Item>

      <Form.Item label='Horas' name='hours_worked'
                 rules={ [
                   {
                     required: true,
                     message: 'Ingresa la cantidad de horas que vas a reportar.'
                   },
                   {
                     type: 'number',
                     min: 1,
                     message: 'Ingresa un valor numérico.'
                   },
                 ] }
                 extra={
                   isFinalReport && <Alert message='Reporte final de prácticas'
                                           description='Tus horas de prácticas llegan o superan las 480 horas requeridas por lo que este será tu reporte final.'
                                           type='info' showIcon />
                 }>
        <InputNumber style={ { width: '100%' } } onChange={ handleChangeHoursWorked } />
      </Form.Item>

      <Form.Item name='type' hidden
                 rules={ [
                   {
                     required: true,
                     message: 'El tipo de reporte no es válido.'
                   },
                   {
                     enum: [ 'partial', 'final' ],
                     message: 'El tipo de reporte no es válido.'
                   },
                 ] }
                 >
        <InputNumber style={ { width: '100%' } } onChange={ handleChangeHoursWorked } />
      </Form.Item>

      <Form.List name='activities'>
        { ( fields, { add, remove } ) => {
          return (
            <div>
              { fields.map( ( field, index ) => (
                <Form.Item
                  { ...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel) }
                  label={ index === 0
                    ? 'Actividades:'
                    : '' }
                  required={ true }
                  key={ field.key }
                >
                  <Form.Item
                    { ...field }
                    // validateTrigger={ [ 'onChange', 'onBlur' ] }
                    rules={ [
                      {
                        required: true,
                        whitespace: true,
                        message: 'Detalla las actividades desarrolladas durante las prácticas.',
                      },
                    ] }
                    noStyle
                  >
                    <Input.TextArea placeholder='Descripción de la actividad'
                                    autoSize={ { maxRows: 4 } }
                                    style={ { width: '90%' } } />
                  </Form.Item>
                  { fields.length > 1
                    ? (
                      <MinusCircleOutlined
                        className='dynamic-delete-button'
                        style={ { margin: '0 8px' } }
                        onClick={ () => {
                          remove( field.name );
                        } }
                      />
                    )
                    : null }
                </Form.Item>
              ) ) }
              <Form.Item { ...formItemLayoutWithOutLabel }>
                <Button
                  type='dashed'
                  onClick={ () => {
                    add();
                  } }
                  style={ { width: '90%' } }
                >
                  <PlusOutlined /> Añadir una actividad
                </Button>
              </Form.Item>
            </div>
          );
        } }
      </Form.List>

      <Form.Item name='student_observations' label='Observaciones:' rules={ [
        {
          required: true,
          whitespace: true,
          message: 'Detalla las actividades desarrolladas durante las prácticas.',
        },
      ] }>
        <Input.TextArea placeholder='Observaciones sobre las prácticas que ha realizado en la empresa.'
                        autoSize={ { maxRows: 4 } } />
      </Form.Item>

      {
        isFinalReport && <h1>Final</h1>
      }

    </Form>
  );
};

export default ReportStudentSectionForm;
