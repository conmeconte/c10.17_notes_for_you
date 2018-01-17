import React, { Component } from 'react';
import '../assets/css/video-add-modal.css';
import { connect } from 'react-redux';
import { toggleModal, addToPlaylist, getVideoTitle } from '../actions';
import { Field, reduxForm } from 'redux-form';

class VideoModal extends Component {
    renderInput(props) {
        const { label, input, meta: { touched, error }  } = props;
        console.log('INPUT: ', input);

        return (
                <input {...input} className="save-title-input form-control"/>
        );
    }
    render () {
        
        return(
            <div style={this.props.deleteModalStyle} className="add-modal-container row">
                <div className="add-modal">
                        <h4>Enter video name: </h4>
                        <form>
                            <Field name="title" onChange={ () => {
                                this.props.getVideoTitle()
                            }} component={this.renderInput}/>
                            <button type="button" onClick={
                    () => {
                        this.props.addToPlaylist(this.props.pastedVideoUrl, this.props.videoTitle, this.props.binderTabPageIds);
                        this.props.toggleModal(this.props.deleteModalStyle);
                    }
                } className="save btn btn-success">Save Video</button>
                <button type="button" onClick={ 
                    () => { 
                        this.props.toggleModal(this.props.deleteModalStyle)
                    }
                    } className="btn btn-primary">Go back</button>
                        </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        url: state.url,
        deleteModalStyle: state.video.deleteModal,
        binderTabPageIds: state.interface,
        pastedVideoUrl: state.videoResults.videoLink,
        videoTitle: state.video.videoTitle
    }
}

VideoModal = reduxForm({
    form: 'add-video'
})(VideoModal);


export default connect(mapStateToProps, { toggleModal, addToPlaylist, getVideoTitle })(VideoModal);