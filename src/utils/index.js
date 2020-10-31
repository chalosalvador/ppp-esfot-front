import checkPropTypes from 'check-prop-types'
import {useDataList} from '../data/useDataList'
export const findByTest= (component, datatest) =>{
    const wrapper = component.find( `[data-test='${datatest}']`  );
    return component
}

export const checkProps= (component, expectedProps) =>{
    const propsErr = checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
    return propsErr;
}

export const RenderPages= (setUpPage, setUpList,setUpForm) =>{
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

        it('Render sin Problemas', () => {
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
}

export const Data = (url) => {
    //const {dataSearch} = useDataList(`/${url}`);

    const data = {
        dataSource: [{
            id: 1,
            name: "Danny"
        }]
    }
    return data;
}

