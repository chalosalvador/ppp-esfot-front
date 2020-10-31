import React, {useState} from 'react';
import withAuth from '../hocs/withAuth';
import {Button, Card,} from 'antd';
import {useAuth} from "../providers/Auth";
import { Descriptions } from 'antd';


const Profile = () => {

    const { currentUser } = useAuth();

    return (
        <>
                <div className="BodyCard">

                    <div>

                        <Card

                            hoverable

                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >

                            <div className="TitleFormDefault">
                                <p >INFORMACION PERFIL</p>
                            </div>
                            <Descriptions  layout="vertical">
                                <Descriptions.Item label="NOMBRES">{ currentUser && currentUser.name }</Descriptions.Item>
                                <Descriptions.Item label="APELLIDOS">{ currentUser && currentUser.lastname }</Descriptions.Item>
                                <Descriptions.Item label="EMAIL">{ currentUser && currentUser.email }</Descriptions.Item>
                                <Descriptions.Item label="TELEFONO">{ currentUser && currentUser.phone }</Descriptions.Item>
                                <Descriptions.Item label="GENERO">{ currentUser && currentUser.sex }</Descriptions.Item>
                            </Descriptions>

                        </Card>
                    </div>
                    <style jsx>{`
                                img{
    padding-left: 35%;
    padding-right: 35%;
    padding-top: 3%;

}
                `}</style>
                </div>

        </>
    )
}

export default withAuth(Profile);