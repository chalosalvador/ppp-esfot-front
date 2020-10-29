import React from 'react';
import { shallow } from 'enzyme';
import CarrierPage from "../pages/CarrierPage";
import {findByTest} from '../utils'
import FacultiesList from "../components/FacultiesList";
import FacultiesForm from "../components/FacultiesForm";
import FacultiesPage from "../pages/Faculties";

const setUpPage = (props={}) => {
    const component = shallow(<FacultiesPage {...props} />);
    return component;
};

const setUpList = (props={}) => {
    const component = shallow(<FacultiesList {...props} />);
    return component;
};

const setUpForm = (props={}) => {
    const component = shallow(<FacultiesForm {...props} />);
    return component;
};

describe('Components', ()=> {

    let componentPage;
    let componentList;
    let componentForm;

    beforeEach(()=> {
        componentPage = setUpPage();
        componentList = setUpList();
        componentForm = setUpForm();
    });

    it('Render sin Problemas', () => {
        const wrapper = findByTest(componentPage, 'Page' );
        expect(wrapper.length).toBe(1);

    });

    it('Render Img sin Problemas', () => {
        const wrapper = findByTest(componentPage, 'Modal' );
        expect(wrapper.length).toBe(1);

    });

    it('Render sin Problemas', () => {
        const wrapper = findByTest(componentList, 'List' );
        expect(wrapper.length).toBe(1);

    });

    it('Render sin Problemas', () => {
        const wrapper = findByTest(componentForm, 'Form' );
        expect(wrapper.length).toBe(1);

    });

});
