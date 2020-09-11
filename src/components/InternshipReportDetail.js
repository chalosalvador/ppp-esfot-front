/**
 * Created by chalosalvador on 9/10/20
 */
import React from 'react';
import { List, Divider, Typography, Descriptions, Rate } from 'antd';
import { FrownFilled, SmileFilled, MehFilled, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import moment from 'moment';

const InternshipReportDetail = ( { report } ) => {
  // const {report, isLoading, isError} = useInternshipReport()

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
              topicsBySubject[ subject_id ].map( ( topic ) => <li>{ topic.name }</li> )
            }
          </ul>
        </div>
      );
    }

    return items;
  };

  return (
    report &&
    <>
      <Descriptions title={ `Reporte ${ report.type === 'partial'
        ? 'parcial'
        : 'final' }` } bordered column={ 2 }>
        <Descriptions.Item label='Desde'>{ moment( report.from_date ).format( 'DD/MM/YYYY' ) }</Descriptions.Item>
        <Descriptions.Item label='Hasta'>{ moment( report.to_date ).format( 'DD/MM/YYYY' ) }</Descriptions.Item>
        <Descriptions.Item label='Observaciones del estudiante'
                           span={ 2 }>{ report.student_observations }</Descriptions.Item>

        {
          report.useful_topics &&
          <Descriptions.Item label='Asignaturas de la malla curricular y temáticas de mayor utilidad para el desarrollo de la práctica:'
                             span={ 2 }>{ renderUsefulTopics( report.useful_topics ) }</Descriptions.Item>
        }

        {
          report.recommended_topics &&
          <Descriptions.Item label='Temáticas que hicieron falta y que no constan en la malla curricular'
                             span={ 2 }>{
            <ul>{
              report.recommended_topics.map( ( topic ) => <li>{ topic.name }</li> )
            }</ul>

          }</Descriptions.Item>
        }
      </Descriptions>

      <Descriptions title='REPORTE DE AVANCE DE LA PRÁCTICA' bordered column={ 2 }>
        <Descriptions.Item label='Área asignada' span={ 2 }>{ report.area }</Descriptions.Item>
        <Descriptions.Item label='Horas ejecutadas hasta la fecha'
                           span={ 2 }>{ report.hours_worked }</Descriptions.Item>
        <Descriptions.Item label='Actividades principales desarrolladas' span={ 2 }>
          <List
            dataSource={ report.activities.map( ( activity ) => activity.description ) }
            renderItem={ item => <List.Item>{ item }</List.Item> }
          />
        </Descriptions.Item>
        <Descriptions.Item label='Observaciones' span={ 2 }>{ report.evaluation_observations }</Descriptions.Item>
      </Descriptions>

      <Descriptions title='Evaluación general cualitativa' bordered column={ 2 }>
        <Descriptions.Item label='Desempeño'
                           span={ 2 }>{ renderRate( report.evaluation_performance ) }</Descriptions.Item>
        <Descriptions.Item label='Motivación'
                           span={ 2 }>{ renderRate( report.evaluation_motivation ) }</Descriptions.Item>
        <Descriptions.Item label='Habilidades y destrezas'
                           span={ 2 }>{ renderRate( report.evaluation_knowledge ) }</Descriptions.Item>
        <Descriptions.Item label='Puntualidad y responsabilidad'
                           span={ 2 }>{ renderRate( report.evaluation_punctuality ) }</Descriptions.Item>
      </Descriptions>

      <Descriptions title='EVALUACIÓN DE LA PRÁCTICA PREPROFESIONAL' bordered column={ 2 }>
        <Descriptions.Item label='Novedades Reportadas por el estudiante/empresa'
                           span={ 2 }>{ report.tutor_observations }</Descriptions.Item>
      </Descriptions>

      {
        report.type === 'final'
          ? <Descriptions title='Evaluación cualitativa' bordered column={ 2 }>
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
          </Descriptions>
          : <Descriptions title='REPORTE DE SEGUIMIENTO A LAS PRÁCTICAS PREPROFESIONALES' bordered column={ 2 }>
            <Descriptions.Item label='Actividades de seguimiento ejecutadas por el tutor'
                               span={ 2 }>{ report.tutor_followup_actions }</Descriptions.Item>
            <Descriptions.Item label='Acciones de mejora'
                               span={ 2 }>{ report.tutor_improvement_actions }</Descriptions.Item>
          </Descriptions>
      }


    </>
  );
};

export default InternshipReportDetail;
