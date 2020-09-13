/**
 * Created by chalosalvador on 9/9/20
 */
import React from 'react';
import { Descriptions, Typography, Divider } from 'antd';
import { useInternship } from '../data/useInternship';
import ShowError from './ShowError';
import moment from 'moment';

const { Title } = Typography;
const InternshipDetail = ( { internship } ) => {

  return (
    <>
      <Title>
        Detalles de la práctica
      </Title>

      <Descriptions bordered column={ 2 }>
        <Descriptions.Item label='Tipo'>{ internship.type }</Descriptions.Item>
        <Descriptions.Item label='Estado'>{ internship.status }</Descriptions.Item>
        <Descriptions.Item label='Tutor(a)'>
          { internship.teacher
            ? `${ internship.teacher.name } ${ internship.teacher.lastname }`
            : null }
        </Descriptions.Item>
        <Descriptions.Item label='Tipo'>{ internship.type }</Descriptions.Item>
        <Descriptions.Item label='Fecha de inicio'>{ moment( internship.start_date )
          .format( 'DD/MM/YYYY' ) }</Descriptions.Item>
        <Descriptions.Item label='Fecha de fin'>
          { internship.finish_date && moment( internship.finish_date ).format( 'DD/MM/YYYY' ) }
        </Descriptions.Item>
      </Descriptions>

      <Descriptions title={ <Divider orientation='center'><strong>DATOS DEL PRACTICANTE</strong></Divider> }
                    bordered
                    column={ 2 }>
        <Descriptions.Item label='Nombre'>
          { internship.student.name } { internship.student.lastname }
        </Descriptions.Item>
        <Descriptions.Item label='Carrera'>{ internship.student.career }</Descriptions.Item>
        <Descriptions.Item label='Créditos aprobados'>{ 0 }</Descriptions.Item>
        <Descriptions.Item label='Correo'>{ internship.student.email }</Descriptions.Item>
        <Descriptions.Item label='Teléfono'>{ internship.student.phone }</Descriptions.Item>
      </Descriptions>

      <Descriptions title={ <Divider orientation='center'><strong>DATOS DE LA INSTITUCIÓN RECEPTORA</strong></Divider> }
                    bordered
                    column={ 2 }>
        <Descriptions.Item label='Razón social'>{ internship.company.name }</Descriptions.Item>
        <Descriptions.Item label='Tipo'>{ internship.company.type }</Descriptions.Item>
        <Descriptions.Item label='Dirección'>{ internship.company.address }</Descriptions.Item>
        <Descriptions.Item label='Ciudad'>{ internship.company.city }</Descriptions.Item>
        <Descriptions.Item label='Correo'>{ internship.company.email }</Descriptions.Item>
        <Descriptions.Item label='Teléfono'>{ internship.company.phone }</Descriptions.Item>
      </Descriptions>

      <Descriptions title={ <Divider orientation='center'><strong>DATOS DEL RESPONSABLE DE LA INSTITUCIÓN
        RECEPTORA</strong></Divider> }
                    bordered
                    column={ 2 }>
        <Descriptions.Item label='Nombre'>
          { internship.representative.name } { internship.representative.lastname }
        </Descriptions.Item>
        <Descriptions.Item label='Cargo'>{ internship.representative.job_title }</Descriptions.Item>
        <Descriptions.Item label='Correo'>{ internship.representative.email }</Descriptions.Item>
        <Descriptions.Item label='Teléfono'>{ internship.representative.phone }</Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default InternshipDetail;
