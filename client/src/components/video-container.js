import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { playVideo, grabVideoUrl, addVideoUrl, addToPlaylist, toggleModal, getResultStyles, getOpacityDisplay, playPastedLinkVideo, updateBinderArray, getDataObject } from '../actions';



class VideoContainer extends Component {
    constructor (props) {
        super(props);
        this.slideOutVideoSearch = this.slideOutVideoSearch.bind(this);
        this.state = {
            style: {
                transform: 'translateY(-119px)'
            },
            toggleSlideOut: true
        }
    }
    renderInput ({input, type, placeholder, meta: { error, touched }}) {
        console.log({input});
        return (
            <div className="col s8 input-field">
                <input {...input} className="pastedVideoInput" type={type} placeholder={ placeholder }/>
                <p className="red-text">{ touched && error }</p>
            </div>
        );
    }
    handleYouTubeUrl (values) {
        console.log(values);
        console.log("HERE IS A VIDEO INPUT", values["youtube-url"]);
        const youtubeLinkInput = values["youtube-url"];
        if (!youtubeLinkInput) {
            return;
        }
        // console.log(values.input);
        // if (!value) {
        //     console.log("PLEASE SEARCH A VIDEO.");
        //     return;
        // }
        this.props.grabVideoUrl(values.input);
        this.props.playPastedLinkVideo(values["youtube-url"]);
        this.props.toggleModal(this.props.addVideoModalStyle);
        this.props.reset()
        //this.props.getDataObject();
        //this.props.updateBinderArray();
    }
    // componentWillReceiveProps(nextProps){
    //     debugger
    // }
    slideOutVideoSearch() {
        let { toggleSlideOut } = this.state;
        let { transform } = this.state.style;
        if (toggleSlideOut) {
            transform = 'translateY(39px)',
            toggleSlideOut = false;
        } else {
            transform = 'translateY(-119px)';
            toggleSlideOut = true;
        }
        this.setState({
            style: {
                transform: transform
            },
            toggleSlideOut: toggleSlideOut
        });
    }
    render () {
        const { toggleSlideOut } = this.state;
        const { transform } = this.state.style;
    return ( 
        <div className="iframe-wrapper">
            <div className="row">
                <form onSubmit={this.props.handleSubmit(this.handleYouTubeUrl.bind(this))}>
                    <div style={{ transform }} className="row slide-out-input">
                    <Field name="youtube-url" component={this.renderInput} />
                        <div className="col s3">
                            <div className="row btn-wrapper">
                                <button className="btn btn-success green darken-1 video-btn"><i className="material-icons">save</i></button>
                                <button type="button" className="btn btn-primary vidList vid-left-arrow video-btn" onClick={ () => {
                                this.props.getResultStyles(this.props.resultsStyles, this.props.toggleResultsBool)
                                this.props.getOpacityDisplay(this.props.opacityContainer, this.props.toggleResultsBool)
                                }}><i className="fa fa-youtube" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="arrow-container" onClick={ () => {
                    this.slideOutVideoSearch()
                }}>
                    { !toggleSlideOut ? <i className="material-icons">keyboard_arrow_up</i> : <i className="material-icons">keyboard_arrow_down</i> }
                </div>
            </div>
            <div id="video-container" className="video-container">
                <div className="video-embed-wrapper">
                    <iframe allowFullScreen id="video-iframe" src={this.props.videoLink} className="video-iframe"></iframe>
                </div>
            </div>
        </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        pastedVideoUrl: state.videoResults.videoLink,
        videoLink: state.video.videoLink,
        binderTabPageIds: state.interface,
        playlist: state.videoResults.playlist,
        addVideoModalStyle: state.video.addVideoModal,
        videoTitle: state.video.videoTitle,
        resultsStyles: state.video.resultsStyles,
        toggleResultsBool: state.video.toggleResults,
        opacityContainer: state.video.opacityDisplay,
        interface_obj: state.interface
    }
}

function validate(values) {
    const error = {};
    if (!values["youtube-url"]) {
        error["youtube-url"] = 'Please paste a valid YouTube Url'
    }
    return error;
}

VideoContainer = reduxForm({
    form: 'youtube-url',
    validate
})(VideoContainer)

export default connect(mapStateToProps, { playVideo, grabVideoUrl, addToPlaylist, toggleModal, getResultStyles, getOpacityDisplay, playPastedLinkVideo, updateBinderArray, getDataObject })(VideoContainer)