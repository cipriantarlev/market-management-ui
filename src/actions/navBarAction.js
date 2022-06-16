import {
    HIDE_NAV_BAR,
    SHOW_NAV_BAR,
} from '../constants';

export const hideNavBar = () => (dispatch) => {
    dispatch({
        type: HIDE_NAV_BAR,
    })
}

export const showNavBar = () => (dispatch) => {
    dispatch({
        type: SHOW_NAV_BAR,
    })
}