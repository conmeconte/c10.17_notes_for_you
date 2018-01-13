import axios from 'axios';
import types from './types'

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: types.FETCH_USER, payload: res.data });
};
//Video Action Creators
export function getVideoResults (videos) {
      return {
        type: types.GET_VIDEO_RESULTS,
        payload: videos
    }
}
export function getResultStyles (styles, bool) {
    
    if (bool) {
        styles = {
            width : '0%',
            display : 'none'
        }
    } else {
        styles = {
            width : '65%',
            display : 'block'
        }
    }
    console.log("GET RESULTS STYLES: ", styles);
    return {
        type: types.GET_RESULT_STYLES,
        payload: styles
    }
}
export function getOpacityDisplay (styles, bool) {
    if (bool) {
        styles = {
            display: 'none'
        }
    } else {
        styles = {
            display: 'block'
        }
    }
    console.log("GET RESULTS STYLES: ", styles);
    return {
        type: types.GET_OPACITY_DISPLAY,
        payload: styles
    }
}
export function toggleResults (bool) {
    let toggleResults = !bool
    return {
        type: types.TOGGLE_RESULTS,
        payload: toggleResults
    }
}
export function addToPlaylist (videoUrl) {
    console.log("ADD TO PLAYLIST FUNCTION: ", videoUrl );
    return {
        type: types.ADD_TO_PLAYLIST,
        payload: videoUrl
    }
}
export function playVideo () {
    // Change this link to
    // https://www.youtube.com/embed/Ukg_U3CnJWI
    // this VVVVVVVV
    // https://www.youtube.com/watch?v=Ukg_U3CnJWI&t=1s
    var videoId = document.querySelector(".pastedVideoInput").value;
    videoId = videoId.split('&')[0];
    videoId = videoId.split('=')[1];
    videoId = document.querySelector(".currentVideo").src = `https://www.youtube.com/embed/${videoId}`;
    return {
        type: types.PLAY_VIDEO
    }
}
export function grabVideoUrl () {
    var videoLink = document.querySelector(".pastedVideoInput").value;
    return {
        type: types.GRAB_VIDEO_URL,
        payload: videoLink
    }
}
// END OF VIDEO ACTION CREATORS
export function binderArray(binderArray){
    return{
        type: types.BINDER_ARRAY,
        payload: binderArray
    }
}

export function selectBinder(binderObj){
    return{
        type: types.SELECT_BINDER,
        payload: binderObj
    }
}

export function binderUpdate(binder_id){
    return{
        type: types.BINDER_UPDATE,
        payload: binder_id
    }
}

export function tabUpdate(tab_id){
    return{
        type: types.TAB_UPDATE,
        payload: tab_id
    }
}

export function pageUpdate(page_id){
    return{
        type: types.PAGE_UPDATE,
        payload: page_id
    }
}

