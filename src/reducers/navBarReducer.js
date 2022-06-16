import {
    HIDE_NAV_BAR,
    SHOW_NAV_BAR,
} from '../constants';

const initialNavBarState = {
    showNavBar: true,
}

export const handleNavBar = (state = initialNavBarState, action = {}) => {
    switch(action.type) {
        case SHOW_NAV_BAR:
            return Object.assign({}, state, { showNavBar: true });
        case HIDE_NAV_BAR:
            return Object.assign({}, state, { showNavBar: false });
        default:
            return state;    
    }
}