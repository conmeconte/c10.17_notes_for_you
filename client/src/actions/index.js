import axios from 'axios';
import types from './types'

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: types.FETCH_USER, payload: res.data });
};

//PANEL SPECs Action Creator

// Yo hyung, if I set PUT request individually in each of these functions, they will overwrite each other right????
export function setTopLeftHeight(num) {
    // axios.put('/api/page', {
    //     panel_dimensions: {
    //         top_left_panel_height: num
    //     },
    //     binderID: interfaceObj.binder_id,
    //     tabID: interfaceObj.tab_id,
    //     pageID: interfaceObj.page_id
    // });

    return {
        type: types.PANEL_TOP_LEFT_HEIGHT,
        payload: num
    }
}

export function setTopLeftWidth(num) {
    // axios.put('/api/page', {
    //     panel_dimensions: {
    //         top_left_panel_width: num
    //     },
    //     binderID: interfaceObj.binder_id,
    //     tabID: interfaceObj.tab_id,
    //     pageID: interfaceObj.page_id
    // });

    return {
        type: types.PANEL_TOP_LEFT_WIDTH,
        payload: num
    }
}

export function setTopRightHeight(num) {
    // axios.put('/api/page', {
    //     panel_dimensions: {
    //         top_right_panel_height: num
    //     },
    //     binderID: interfaceObj.binder_id,
    //     tabID: interfaceObj.tab_id,
    //     pageID: interfaceObj.page_id
    // });

    return {
        type: types.PANEL_TOP_RIGHT_HEIGHT,
        payload: num
    }
}

export function setNumOfPanels(num) {
    // axios.put('/api/page', {
    //     panel_dimensions: {
    //         number_of_panels: num
    //     },
    //     binderID: interfaceObj.binder_id,
    //     tabID: interfaceObj.tab_id,
    //     pageID: interfaceObj.page_id
    // });

    return {
        type: types.NUM_OF_PANELS,
        payload: num
    }
}

//Lecture Slides Action Creator

export function setSlidesUrl(value, interfaceObj) {
    console.log("setSlides url action 1:", value);
    if (value) {
        if (value.indexOf('presentation/d/') !== -1) {
            const urlSplit1 = value.split("presentation/d/");
            const urlSplit2 = urlSplit1[1].split('/');
            let presentationID = urlSplit2[0];
            const slidesURL = `https://docs.google.com/presentation/d/${presentationID}/embed`;
            axios.put('/api/page', {
                lecture_slides: {
                    lec_id: slidesURL
                },
                binderID: interfaceObj.binder_id,
                tabID: interfaceObj.tab_id,
                pageID: interfaceObj.page_id
            });
            return {
                type: types.SET_SLIDES_URL,
                payload: slidesURL
            }
        }
        else {
            return {
                type: types.SET_SLIDES_URL,
                payload: ''
            };
        }
    }
    else {
        return {
            type: types.SET_SLIDES_URL,
            payload: ''
        };
    }
}
// End of Lecture Slides Action Creators

//Video Action Creators
export function getVideoResults(videos) {
    return {
        type: types.GET_VIDEO_RESULTS,
        payload: videos
    }
}
export function getResultStyles(styles, bool) {

    if (bool) {
        styles = {
            width: '0%',
            display: 'none'
        }
    } else {
        styles = {
            width: '65%',
            display: 'block'
        }
    }
    console.log("GET RESULTS STYLES: ", styles);
    return {
        type: types.GET_RESULT_STYLES,
        payload: styles
    }
}
export function getOpacityDisplay(styles, bool) {
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
export function toggleResults(bool) {
    let toggleResults = !bool
    return {
        type: types.TOGGLE_RESULTS,
        payload: toggleResults
    }
}
export function addToPlaylist(videoUrl, interfaceObj) {
    console.log('hahahahaha ', videoUrl);

    axios.post('/api/video', {
        video: {
            videoTitle: 'ReactJS Crash Course',
            videoId: 'A71aqufiNtQ',
            videoUrl: videoUrl
        },
        binderID: interfaceObj.binder_id,
        tabID: interfaceObj.tab_id,
        pageID: interfaceObj.page_id
    });
    return {
        type: types.ADD_TO_PLAYLIST,
        payload: videoUrl
    }
}
export function playVideo() {
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
export function grabVideoUrl() {
    var videoLink = document.querySelector(".pastedVideoInput").value;
    return {
        type: types.GRAB_VIDEO_URL,
        payload: videoLink
    }
}

export function getDataObject() {

    return (dispatch) => {
        const test = axios.get('/api/binder')
            .then((resp) => {
                //console.log("get data object: ", resp.data);

                dispatch({
                    type: types.GET_USER_DATA,
                    payload: resp.data
                });
            }).catch(err => {
                dispatch({
                    type: 'error',
                    msg: 'Failed call in get user data'
                });
            });
    }
}

export function updateBinderArray() {

    return (dispatch) => {
        const test = axios.get('/api/binder')
            .then((resp) => {
                console.log("get response: ", resp.data.binder_arr_obj);

                dispatch({
                    type: types.UPDATE_BINDER_ARRAY,
                    payload: resp.data.binder_arr_obj
                });
            }).catch(err => {
                dispatch({
                    type: 'error',
                    msg: 'Failed call in binderarray'
                });
            });
    }
}

export function selectBinder(binderObj) {
    return {
        type: types.SELECT_BINDER,
        payload: binderObj
    }
}

export function selectTab(tabObj) {
    return {
        type: types.SELECT_TAB,
        payload: tabObj
    }
}

export function selectPage(pageObj) {
    return {
        type: types.SELECT_PAGE,
        payload: pageObj
    }
}

export function addBinder() {
    return (dispatch) => {
        const test = axios.post('/api/binder')
            .then((resp) => {
                //console.log("addBinder response: ", resp);
                dispatch({
                    type: types.ADD_BINDER,
                    payload: resp.data.binder_arr_obj
                });
            }).catch(err => {
                dispatch({
                    type: 'error',
                    msg: 'Failed call in binderarray'
                });
            });
    }
}

export function addTab(binder_id) {
    return (dispatch) => {
        const test = axios.post('/api/tab', {
            binderID: binder_id
        })
            .then((resp) => {
                //console.log("add tab: ", resp);
                dispatch({
                    type: types.ADD_TAB,
                    payload: resp
                });
            }).catch(err => {
                dispatch({
                    type: 'error',
                    msg: 'Failed call in binderarray'
                });
            });
    }
}

export function addPage(binder_id, tab_id) {
    return (dispatch) => {
        const test = axios.post('/api/page', {
            binderID: binder_id,
            tabID: tab_id
        })
            .then((resp) => {
                //console.log("addPage response: ", resp);
                dispatch({
                    type: types.ADD_PAGE,
                    payload: resp
                });
            }).catch(err => {
                dispatch({
                    type: 'error',
                    msg: 'Failed call in binderarray'
                });
            });
    }
}

export function deleteBinder(binder_id) {
    return (dispatch) => {
        const test = axios.delete(`/api/binder?binderID=${binder_id}`, {
        })
            .then((resp) => {
                console.log("delete binder response: ", resp);

                dispatch({
                    type: types.DELETE_BINDER,
                    payload: resp.data.binder_arr_obj
                });
            }).catch(err => {
                dispatch({
                    type: 'error',
                    msg: 'Failed call in binderarray'
                });
            });
    }
}

//Notes Action Creator

export function save_notes() {
    return {
        type: types.SAVE_NOTES
    }
}

