import _ from 'lodash';
import { setError } from '../redux/app.actions';
import consts from "../global/consts";


export const invalidId = id => (id <=0 && id > consts.BUILTIN_TRAININGS_ID_COUNTER_START) || (id instanceof String && id.startsWith('-') && id.length < 3);
export const builtinValidId = id => id <= consts.BUILTIN_TRAININGS_ID_COUNTER_START || (id instanceof String && id.startsWith('-') && id.length >= 3);
export const modelValidId = id => id && id.length > 0 && id !== 0 && !builtinValidId(id) && !invalidId(id);


export const objectValidId = obj => {
    return obj && modelValidId(obj.id);
};
export const map1stObject = map => {
    let obj;
    if (map !== null) {
        obj = _.map(map)[0];
    }
    return obj;
};
export const objectToMap = obj => {
    const map = {};
    if (obj !== null && obj.id !== undefined) {
        map[obj.id] = obj;
    }
    return map;
};

// =============================================================================================
export const validateId = (dispatch, id, action) => {
    if (!modelValidId(id)) {
        dispatch(setError(`${action} - error`, `invalid id=[${id}]`));
        return false;
    }
    return true;
};
// =============================================================================================
