/**
 * Created by chalosalvador on 9/10/20
 */
import React from 'react';
import { List, Divider, Typography, Descriptions, Rate, Button } from 'antd';
import {
  FrownFilled, SmileFilled, MehFilled, CheckCircleTwoTone, CloseCircleTwoTone, EditOutlined
} from '@ant-design/icons';
import { useAuth } from '../providers/Auth';
import ReportStudentSectionFormModal from './ReportStudentSectionFormModal';
import { useInternshipReport } from '../data/useInternshipReport';
import ShowError from './ShowError';

const { Title } = Typography;

const InternshipReportDetail = ( props ) => {
  const { report, isLoading, isError } = useInternshipReport( props.report.internship_id, props.report.id );
  const { currentUser } = useAuth();

  const customIcons = {
    1: {
      text: 'Deficiente',
      icon: <FrownFilled />
    },
    2: {
      text: 'Malo',
      icon: <FrownFilled />
    },
    3: {
      text: 'Regular',
      icon: <MehFilled />
    },
    4: {
      text: 'Muy Bueno',
      icon: <SmileFilled />
    },
    5: {
      text: 'Excelente',
      icon: <SmileFilled />
    }
  };

  const renderRate = ( value ) =>
    <>
      <Rate disabled
            defaultValue={ value }
            character={ ( { index } ) => {
              return customIcons[ index + 1 ].icon;
            } } />
      { value
        ? <span className='ant-rate-text'>{ customIcons[ value ].text }</span>
        : '' }
    </>;

  const renderUsefulTopics = ( topicsBySubject ) => {
    let items = [];
    for( const subject_id in topicsBySubject ) {
      items.push(
        <div key={ subject_id }>
          <div><strong>{ topicsBySubject[ subject_id ][ 0 ].subject_name.toUpperCase() }</strong></div>
          <ul>
            {
              topicsBySubject[ subject_id ].map( ( topic, i ) => <li key={ i }>{ topic.name }</li> )
            }
          </ul>
        </div>
      );
    }

    return items;
  };

  if( isLoading ) {
    return <div>Cargando...</div>;
  }

  if( isError ) {
    return <ShowError error={ isError } />;
  }

  return (
    report &&
    <>
      <Title>
        { `Reporte ${ report.type === 'partial'
          ? 'parcial'
          : 'final' }` }
      </Title>

      <Descriptions title={ <Divider orientation='center'><strong>REPORTE DEL ESTUDIANTE</strong></Divider> }
                    bordered
                    column={ 2 }
                    extra={ currentUser.role === 'ROLE_STUDENT' && currentUser.id === report.user_id && report.status === 'representative_pending' &&
                    <ReportStudentSectionFormModal edit={ true } report={ report } /> }>
        <Descriptions.Item label='Desde'>{ report.from_date }</Descriptions.Item>
        <Descriptions.Item label='Hasta'>{ report.to_date }</Descriptions.Item>
        <Descriptions.Item label='Horas ejecutadas hasta la fecha'>{ report.hours_worked }</Descriptions.Item>
        <Descriptions.Item label='Área asignada'>{ report.area }</Descriptions.Item>
        <Descriptions.Item label='Actividades principales desarrolladas' span={ 2 }>
          <ol>
            { report.activities.map( ( activity, i ) => <li key={ i }>{ activity.description }</li> ) }
          </ol>
        </Descriptions.Item>
        <Descriptions.Item label='Observaciones del estudiante'
                           span={ 2 }>{ report.student_observations }</Descriptions.Item>

        {
          report.type === 'final' && report.useful_topics &&
          <Descriptions.Item label='Asignaturas de la malla curricular y temáticas de mayor utilidad para el desarrollo de la práctica:'
                             span={ 2 }>{ renderUsefulTopics( report.useful_topics ) }</Descriptions.Item>
        }

        {
          report.type === 'final' && report.recommended_topics &&
          <Descriptions.Item label='Temáticas que hicieron falta y que no constan en la malla curricular'
                             span={ 2 }>{
            <ul>{
              report.recommended_topics.map( ( topic, i ) => <li key={ i }>{ topic.name }</li> )
            }</ul>

          }</Descriptions.Item>
        }
      </Descriptions>


      <Descriptions title={ <Divider orientation='center'><strong>REPORTE DE LA EMPRESA</strong></Divider> }
                    bordered
                    column={ 2 }>
        <Descriptions.Item label='Desempeño'
                           span={ 2 }>{ renderRate( report.evaluation_performance ) }</Descriptions.Item>
        <Descriptions.Item label='Motivación'
                           span={ 2 }>{ renderRate( report.evaluation_motivation ) }</Descriptions.Item>
        <Descriptions.Item label='Habilidades y destrezas'
                           span={ 2 }>{ renderRate( report.evaluation_knowledge ) }</Descriptions.Item>
        <Descriptions.Item label='Puntualidad y responsabilidad'
                           span={ 2 }>{ renderRate( report.evaluation_punctuality ) }</Descriptions.Item>
        <Descriptions.Item label='Observaciones' span={ 2 }>{ report.evaluation_observations }</Descriptions.Item>
      </Descriptions>


      <Descriptions title={ <Divider orientation='center'><strong>REPORTE DEL TUTOR ACADÉMICO</strong></Divider> }
                    bordered
                    column={ 2 }>
        <Descriptions.Item label='Novedades reportadas por el estudiante/empresa'
                           span={ 2 }>{ report.tutor_observations }</Descriptions.Item>
        {
          report.type === 'final'
            ? <>
              <Descriptions.Item label='Desempeño'>{ report.tutor_recommends !== null
                ? report.tutor_recommends
                  ? <CheckCircleTwoTone twoToneColor='#52c41a' />
                  : <CloseCircleTwoTone twoToneColor='#eb2f96' />
                : null }</Descriptions.Item>
              <Descriptions.Item label='Observaciones'>{ report.tutor_recommends_observations }</Descriptions.Item>
              <Descriptions.Item label='Motivación'>{ report.tutor_knowledge_contribution !== null
                ? report.tutor_knowledge_contribution
                  ? <CheckCircleTwoTone twoToneColor='#52c41a' />
                  : <CloseCircleTwoTone twoToneColor='#eb2f96' />
                : null }</Descriptions.Item>
              <Descriptions.Item label='Observaciones'>{ report.tutor_knowledge_contribution_observations }</Descriptions.Item>
              <Descriptions.Item label='Habilidades y destrezas'>{ report.tutor_recommends_approval !== null
                ? report.tutor_recommends_approval
                  ? <CheckCircleTwoTone twoToneColor='#52c41a' />
                  : <CloseCircleTwoTone twoToneColor='#eb2f96' />
                : null }</Descriptions.Item>
              <Descriptions.Item label='Observaciones'>{ report.tutor_recommends_approval_observations }</Descriptions.Item>
            </>
            : <>
              <Descriptions.Item label='Actividades de seguimiento ejecutadas'
                                 span={ 2 }>{ report.tutor_followup_actions }</Descriptions.Item>
              <Descriptions.Item label='Acciones de mejora'
                                 span={ 2 }>{ report.tutor_improvement_actions }</Descriptions.Item>
            </>
        }
      </Descriptions>


    </>
  );
};

export default InternshipReportDetail;
