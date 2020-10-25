import React from 'react';
import { shallow } from 'enzyme';
import ESFOTCards from "../components/ESFOTCards";
import TableDefault from "../components/TableDefault";
import {findByTest, checkProps} from '../utils'
import checkPropTypes from 'check-prop-types'

const setUp = (props={}) => {
    const component = shallow(<ESFOTCards {...props} />);
    return component;
};

describe('Props Components', ()=> {

    describe ('Check PropTypes', () => {
        it ( 'No debe mostrar la advertencia', () =>{
            const expectedProps = {
                title: 'Anuncio'
            }
            const propsErr = checkPropTypes(checkProps(ESFOTCards, expectedProps));
            expect(propsErr).toBeUndefined();
        })
        it ( 'No debe mostrar la advertencia', () =>{
            const expectedProps = {
                title: 'Anuncio',
                dataSource:[{
                    id: 1,
                }]
            }
            const propsErr = checkPropTypes(checkProps(TableDefault, expectedProps));
            expect(propsErr).toBeUndefined();
        })


    });
    describe('Tiene Props', () => {
        let wrapper;
        beforeEach(() => {
            const props = {
                title: "Tecnologia"

            }
            wrapper = setUp(props);
        });

        it('Render sin errores', () => {
            const component = findByTest(wrapper, 'Anuncio');
            expect(component.length).toBe(1);

        });

    });
});
