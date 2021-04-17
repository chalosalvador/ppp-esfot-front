import React, { useState } from 'react'
import withAuth from '../hocs/withAuth'
import ModalContext, { ModalContextProvider } from '../context/ModalContext'
import { Button, Card } from 'antd'
import { Form } from 'antd'

<<<<<<< HEAD:src/pages/Profile.js
const Profile = () => {
  const [MyStudent, setMyStudent] = useState([])
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  }
  return (
    <>
      <ModalContextProvider>
        <div className="BodyCard">
          <div>
            <Card
              hoverable
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Form {...layout} name="nest-messages">
                <Form.Item className="TitleFormDefault">
                  <div className="TitleFormDefault">
                    <p>INFORMACION PERFIL</p>
                  </div>
                </Form.Item>
                <Form.Item name="name" label="NOMBRE">
                  <label>N</label>
                </Form.Item>
                <Form.Item name="Apellidos" label="APELLIDOS">
                  <label></label>
                </Form.Item>
                <Form.Item name="EMAIL" label="EMAIL">
                  <label></label>
                </Form.Item>
                <Form.Item name="Direccion" label="DIRECCION">
                  <label></label>
                </Form.Item>
              </Form>
            </Card>
          </div>
          <style jsx>{`
            img {
              padding-left: 35%;
              padding-right: 35%;
              padding-top: 3%;
            }
          `}</style>
        </div>
      </ModalContextProvider>
    </>
  )
}

export default withAuth(Profile)
=======
const ProfilePage = () => {

    const [MyStudent, setMyStudent] = useState([]);
    const layout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 13},
    };
    return (
        <>
            <ModalContextProvider>
                <div className="BodyCard">

                    <div>

                        <Card

                            hoverable

                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >


                                    <Form {...layout} name="nest-messages" >
                                        <Form.Item className="TitleFormDefault">
                                            <div className="TitleFormDefault">
                                                <p >INFORMACION PERFIL</p>
                                            </div>

                                        </Form.Item>
                                        <Form.Item name='name' label="NOMBRE" >
                                            <label>N</label>
                                        </Form.Item>
                                        <Form.Item name='Apellidos' label="APELLIDOS" >
                                            <label></label>
                                        </Form.Item>
                                        <Form.Item name='EMAIL' label="EMAIL">
                                            <label></label>
                                        </Form.Item>
                                        <Form.Item name='Direccion' label="DIRECCION">
                                            <label></label>
                                        </Form.Item>

                                    </Form>


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

            </ModalContextProvider>


        </>
    )
}

export default withAuth(ProfilePage);
>>>>>>> dev:src/pages/ProfilePage.js
