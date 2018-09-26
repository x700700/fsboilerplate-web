import React from 'react';
import { colorTheme } from "../../global/theme.colors";
import consts from '../../global/consts';
import StyledInput from '../tools/StyledInput';
import { objectValidId } from '../../utils/misc';


//Todo: protect fields' length !!! with: https://www.npmjs.com/package/react-truncate-markup
//Todo: Validations with: https://www.npmjs.com/package/validator


const inputTheme = {
    height: '2.3em',
    width: 'initial',
    margin: '0.3rem',
    border: '2px solid ' + colorTheme.col1_d4,
    borderRadius: '2px',
    bgColor: colorTheme.col1_d4,
    color: colorTheme.col1_l3,
    emptyBgColor: 'red',
    fontStyle: 'oblique',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '0',
};

export const Header = ({ theme, training, UpdateField }) => {
    const { name } = training;
    const inputsDisabled = !objectValidId(training);
    return (
        <StyledInput id='training-header-input' theme={inputTheme}
                     valType={consts.TRAINING_VAL_TYPE_NAME}
                     value={name} inputsDisabled={inputsDisabled}
                     UpdateField={UpdateField} item={training}/>
    );
};
