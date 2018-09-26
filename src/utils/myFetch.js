// import cookie from 'react-cookies';


import {setNotLoggedOn} from "../redux/user.actions";

export const myFetch = (dispatch, url, method, body, onSuccess, onError) =>
{
    const bodyJson = body ? JSON.stringify(body) : undefined;
    console.log(`>>>>> FETCH ${method} ${url} - body=[${bodyJson}]`);
    let success = false;
    let responseError = '';
    return fetch(url,
        {
            method: method,
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: bodyJson
        })
        .then((response) => {
            console.log('response: ', response);
            if (response.ok && response.status === 200) {
                console.log(`${url} received response.`);
                success = true;
                // cookie.save('connect.sid', response['connect.sid']);
                return response.json();
            } else {
                responseError = `${response.status} - ${response.statusText}`;
                if (response.status === 401 && dispatch) {
                    dispatch(setNotLoggedOn());
                }
                return response.json();
            }
        })
        .then((data) => {
            if (success) {
                console.log(`>>>>> FETCH ${method} ${url} - successfully received:`);
                console.log(data);
                onSuccess(dispatch, data);
            } else {
                const error = data.message || 'Communication with server';
                console.error('FETCH response not OK - ', `${responseError} - ${error}`);
                onError(dispatch, '', error);
            }
        })
        .catch((error) => {
            console.error('FETCH catch - ', `${responseError} - ${error}`);
            onError(dispatch, '', error);
        });
};
