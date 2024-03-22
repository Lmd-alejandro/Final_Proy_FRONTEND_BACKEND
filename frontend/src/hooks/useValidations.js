import { useState } from 'react';

const useValidations = ({ initForm }) => {
    const [formError, setFormError] = useState(initForm);

    const accionValidations = (form, regex) => {
        const keys = Object.keys(form);

        for (let key of keys) {
            if (key === 'source' || key === 'visitorParkingAvailable') {
                setFormError((props) => ({
                    ...props,
                    [key]: ''
                }));
            } else {
                if (!form[key]) {
                    setFormError((props) => ({
                        ...props,
                        [key]: `The field is required`
                    }));
                    return true;
                } else {
                    setFormError((props) => ({
                        ...props,
                        [key]: ''
                    }));
                }
            }

            if (!regex[key].test(form[key])) {
                setFormError((props) => ({
                    ...props,
                    [key]: 'The field contains invalid or missing characters'
                }));
                return true;
            } else {
                setFormError((props) => ({
                    ...props,
                    [key]: ''
                }));
            }
        }
    }

    return { formError, accionValidations, setFormError };
}

export default useValidations;