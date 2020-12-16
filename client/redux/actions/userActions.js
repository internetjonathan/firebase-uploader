import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types'

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.post('/login', userData)
        .then(res => {
            localStorage.setItem("FBtoken", `Bearer ${res.data.token}`);
            axios.default.headers.common['Authorization'] = `Bearer${res.data.token}`
            dispatch(getUserData)
            dispatch({ type: CLEAR_ERRORS })
            history.push('/');
        })
        .catch(err => {
            // setErrors(err.response.data)
            // setLoading(false)


        });
}

export const getUserData = () => (dispatch) => {
    axios.get('user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })

        })
}