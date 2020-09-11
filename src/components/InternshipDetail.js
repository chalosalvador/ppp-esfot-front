/**
 * Created by chalosalvador on 9/9/20
 */
import React from 'react';
import { Descriptions, Badge } from 'antd';
import { useInternship } from '../data/useInternship';
import ShowError from './ShowError';

const InternshipDetail = ( { id } ) => {
  const { internship, isLoading, isError } = useInternship( id );

  if( isLoading ) {
    return <div>Cargando...</div>;
  }

  if( isError ) {
    return <ShowError error={ isError } />;
  }

  return (
    <>
      <Descriptions title='DATOS DE LA EMPRESA' bordered column={ 2 }>
        <Descriptions.Item label='Razón social'>{ internship.company.name }</Descriptions.Item>
        <Descriptions.Item label='Tipo'>{ internship.company.type }</Descriptions.Item>
        <Descriptions.Item label='Dirección'>{ internship.company.address }</Descriptions.Item>
        <Descriptions.Item label='Ciudad'>{ internship.company.city }</Descriptions.Item>
        <Descriptions.Item label='Correo'>{ internship.company.email }</Descriptions.Item>
        <Descriptions.Item label='Teléfono'>{ internship.company.phone }</Descriptions.Item>
      </Descriptions>

      <Descriptions title='DATOS DEL RESPONSABLE DE LA INSTITUCIÓN RECEPTORA' bordered column={ 2 }>
        <Descriptions.Item label='Nombre'>
          { internship.representative.name } { internship.representative.lastname }
        </Descriptions.Item>
        <Descriptions.Item label='Cargo'>{ internship.representative.job_title }</Descriptions.Item>
        <Descriptions.Item label='Correo'>{ internship.representative.email }</Descriptions.Item>
        <Descriptions.Item label='Teléfono'>{ internship.representative.phone }</Descriptions.Item>
      </Descriptions>

      <Descriptions title='DATOS DEL PRACTICANTE' bordered column={ 2 }>
        <Descriptions.Item label='Nombre'>
          { internship.student.name } { internship.student.lastname }
        </Descriptions.Item>
        <Descriptions.Item label='Carrera'>{ internship.student.career }</Descriptions.Item>
        <Descriptions.Item label='Créditos aprobados'>{ 0 }</Descriptions.Item>
        <Descriptions.Item label='Correo'>{ internship.student.email }</Descriptions.Item>
        <Descriptions.Item label='Teléfono'>{ internship.student.phone }</Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default InternshipDetail;
