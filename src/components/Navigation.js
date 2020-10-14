/**
 * Created by chalosalvador on 2/7/20
 */
import React, { useState } from 'react';

import Routes from '../constants/routes';
import { useAuth } from '../providers/Auth';
import { Menu } from 'antd';
import { LoadingOutlined, LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navigation.css';

const linkStyle = {};

const Navigation = ( props ) => {
  let location = useLocation();

  const [ menuState, setMenuState ] = useState( {
    current: location.pathname, // set the current selected item in menu, by default the current page
    collapsed: false,
    openKeys: []
  } );
  const { isAuthenticated, isCheckingAuth, currentUser } = useAuth();

  React.useEffect( () => {
    setMenuState( {
      ...menuState,
      current: location.pathname
    } );
  }, [ location, isAuthenticated ] );

  const handleClick = ( e ) => {
    console.log( 'click ', e );
    setMenuState( {
      ...menuState,
      current: e.key
    } );
  };

  return (
    <>
      <Menu
        mode={ props.mode }
        onClick={ handleClick }
        className='menu'
        theme='dark'
        selectedKeys={ [ menuState.current ] }
        style={ {
          lineHeight: '64px',
          width: 'fit-content'
        } }
      >
        <Menu.Item key={ Routes.INDEX }>
          <Link to={ Routes.INDEX } style={ linkStyle }>Inicio</Link>
        </Menu.Item>

        <Menu.Item key={ Routes.ABOUT }>
          <Link to={ Routes.ABOUT } style={ linkStyle }>Acerca de</Link>
        </Menu.Item>

        {
          isAuthenticated
            ? <Menu.SubMenu icon={ <UserOutlined /> } title={ currentUser && currentUser.name }>
              <Menu.ItemGroup title='CONFIGURACION'>
                <Menu.Item key={ Routes.PROFILE }>
                  <Link to={ Routes.PROFILE } style={ linkStyle }>Perfil</Link>
                </Menu.Item>
                <Menu.Item key='setting:2'>Option 2</Menu.Item>
              </Menu.ItemGroup>


              <Menu.Item key={ Routes.LOGIN }>
                <Link to={ Routes.LOGOUT } className='logout-link'>
                  {
                    isCheckingAuth
                      ? <LoadingOutlined />
                      : <><LogoutOutlined /> Salir</>
                  }
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
            : <Menu.Item key={ Routes.LOGIN }>
              <Link to={ Routes.LOGIN }>
                {
                  isCheckingAuth
                    ? <LoadingOutlined />
                    : <><LoginOutlined /> Ingresar</>
                }
              </Link>
            </Menu.Item>
        }
      </Menu>
    </>
  );
};

export default Navigation;
