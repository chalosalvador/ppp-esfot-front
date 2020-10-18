import React from 'react';
import AboutPage from "../pages/AboutPage";
import {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-15';

describe('About Page', () => {
    it('render sin problemas', () =>{
        const wrapper = mount (<AboutPage/>);
        expect(wrapper).toMatchSnapshot();
    })
})