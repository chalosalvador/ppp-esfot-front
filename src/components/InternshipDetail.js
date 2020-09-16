/**
 * Created by chalosalvador on 9/9/20
 */
import React from 'react';
import { Descriptions, Typography, Divider } from 'antd';
import moment from 'moment';

const { Title } = Typography;
const InternshipDetail = ( { internship } ) => {

  return (
    <>
      <Title>
        Detalles de la práctica
      </Title>

      <Descriptions bordered column={ 2 }>
        <Descriptions.Item label='Fecha de creación'>
          { moment( internship.created_at ).format( 'DD/MM/YYYY HH:mm:ss' ) }
        </Descriptions.Item>
        <Descriptions.Item label='Estado'>{ internship.status }</Descriptions.Item>
        <Descriptions.Item label='Tutor(a)'>
          { internship.teacher
            ? `${ internship.teacher.name } ${ internship.teacher.lastname }`
            : null }
        </Descriptions.Item>
        <Descriptions.Item label='Tipo'>{ internship.type }</Descriptions.Item>
        <Descriptions.Item label='Fecha de inicio'>
          { moment( internship.start_date ).format( 'DD/MM/YYYY' ) }
        </Descriptions.Item>
        <Descriptions.Item label='Fecha de fin'>
          { internship.finish_date && moment( internship.finish_date ).format( 'DD/MM/YYYY' ) }
        </Descriptions.Item>

        <Descriptions.Item label='Convenio'>
          <p>Código: { internship.institutional_agreement_code }</p>
          <p>Nombre: { internship.institutional_agreement_name }</p>
        </Descriptions.Item>

        <Descriptions.Item label='Proyecto de investigación'>
          <p>Código: { internship.research_project_code }</p>
          <p>Nombre: { internship.research_project_name }</p>
        </Descriptions.Item>

        <Descriptions.Item label='Proyecto de vinculación'>
          <p>Código: { internship.social_project_code }</p>
          <p>Nombre: { internship.social_project_name }</p>
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
        <Descriptions.Item label='RUC'>{ internship.company.ruc }</Descriptions.Item>
        <Descriptions.Item label='Razón social'>{ internship.company.name }</Descriptions.Item>
        <Descriptions.Item label='Dirección'>{ internship.company.address }</Descriptions.Item>
        <Descriptions.Item label='Ciudad'>{ internship.company.city }</Descriptions.Item>
        <Descriptions.Item label='Correo'>{ internship.company.email }</Descriptions.Item>
        <Descriptions.Item label='Teléfono 1'>{ internship.company.phone }</Descriptions.Item>
        <Descriptions.Item label='Teléfono 2'>{ internship.company.mobile }</Descriptions.Item>
        <Descriptions.Item label='Tipo'>{ internship.company.type }</Descriptions.Item>
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
        <Descriptions.Item label='Teléfono 1'>{ internship.representative.phone }</Descriptions.Item>
        <Descriptions.Item label='Teléfono 2'>{ internship.representative.mobile }</Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default InternshipDetail;
