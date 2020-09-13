/**
 * Created by chalosalvador on 9/11/20
 */
import React from 'react';
import { Statistic, Row, Col } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone, ClockCircleTwoTone } from '@ant-design/icons';
import InternshipsList from './InternshipsList';
import { useAuth } from '../providers/Auth';
import withAuth from '../hocs/withAuth';

const HomeStudent = () => {
  const { currentUser } = useAuth();
  return (
    <div>

      <Row justify='center'>
        <Col span={ 3 } style={ { textAlign: 'center' } }>
          <Statistic title='Horas registradas'
                     value={ currentUser.hours_registered }
                     prefix={ <CheckCircleTwoTone twoToneColor='#52c41a' /> } />
        </Col>
        <Col span={ 3 } style={ { textAlign: 'center' } }>
          <Statistic title='Horas aprobadas'
                     value={ currentUser.hours_approved }
                     prefix={ <CheckCircleTwoTone twoToneColor='#1890ff' /> } />
        </Col>
        <Col span={ 3 } style={ { textAlign: 'center' } }>
          <Statistic title='Horas pendientes'
                     value={ currentUser.hours_pending }
                     prefix={ <ClockCircleTwoTone twoToneColor='#fa8c16' /> } />
        </Col>
        <Col span={ 3 } style={ { textAlign: 'center' } }>
          <Statistic title='Horas rechazadas'
                     value={ currentUser.hours_rejected }
                     prefix={ <CloseCircleTwoTone twoToneColor='#f5222d' /> } />
        </Col>
      </Row>
      <h2>Prácticas preprofesionales realizadas</h2>
      <InternshipsList />
    </div>
  );
};

export default withAuth( HomeStudent );
