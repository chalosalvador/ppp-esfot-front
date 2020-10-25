import React, {useState} from 'react';
import { Modal, } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import FacultiesForm from '../components/FacultiesForm';
import CarrierForm from "../components/CarrierForm";
import SubjectForm from "../components/SubjectForm";
import StudentForm from "../components/StudentForm";
import TeacherForm from "../components/TeacherForm";
import AdministrativeForm from "../components/AdministrativeForm";

const ModalContext = React.createContext({});
const { confirm } = Modal;
export const ModalContextProvider = ({children}) => {
    const [showModal, setShowModal ] = useState( false );
    const [edit, setEdit ] = useState(false); 
    const [register, setRegister] = useState([]);
    const [form, setForm] = useState('');
    const handleCancel = () => {
        confirm( {
          title: '¿Confirmas que deseas cerrar el formulario?',
          icon: <ExclamationCircleOutlined />,
          content: 'Se perderá toda la información ingresada.',
          okText: 'Sí',
          cancelText: 'No',
          onOk() {
            // form.resetFields();
            setShowModal( false );
          },
          onCancel() {},
        } );
      };
    
    const ModalForm = (props) => {
        let contentForm;
        switch(form){
            case 'FacultiesForm':
                contentForm = <FacultiesForm edit={edit} register={register}/>
                break;
            case 'CarrierForm':
                contentForm = <CarrierForm edit={edit} register={register} />
                break;
            case 'SubjectForm':
                contentForm = <SubjectForm edit={edit} register={register}/>
                break;
            case 'StudentForm':
                contentForm = <StudentForm edit={edit} register={register}/>
                break;
            case 'TeacherForm':
                contentForm = <TeacherForm edit={edit} register={register}/>
                break;
            case 'AdministrativeForm':
                contentForm = <AdministrativeForm edit={edit} register={register}/>
                break;
            default:
                console.log('No se ha enviado un formulario como paráemtro');
                break;
        }
        return contentForm; 
    }
      return(
      <>
      <ModalContext.Provider value= {{setShowModal, setEdit, setRegister, setForm}}>
      {children}
      <Modal
        title={!edit? <h3>Agregar</h3> : <h3>Edicion</h3>}
        visible={ showModal }
        // closable={ false }
        maskClosable={ false }
        // confirmLoading={ isSubmitting }
        // okText='Enviar solicitud'
        // cancelText={ 'Cancelar' }
        onCancel={ handleCancel }
        // onOk={ () => form.submit() }
        footer={ null }
        width={ 800 }
        destroyOnClose={ true }>
         <ModalForm/> 
         
        
        
      </Modal>
      </ModalContext.Provider>
      
      </>
      )
}

export default ModalContext;