const mongoose= require('mongoose');
const {Schema} = mongoose;
const tabSchema = require('./Tabs');

// const binderSchema = new Schema({
//     binder_name: String, 
//     binder_obj : [tabSchema],
//     _user: {type: Schema.Types.ObjectId, ref: 'User'}
// })
const binderSchema = new Schema({
    binder_obj : {
        binder_id: String,
        binder_name: String, 
        binder_color : String,
        binder_url : String,
        tab_obj:{
            tab_name : String,   
            tab_color : String,
            tab_id : String,
            tab_url : String,
            page_obj : {
                page_color : String,
                page_date : {type: Date, default: Date.now},
                page_id : String,
                page_name : String,
                page_url : String,
                calendar : {
                    cal_url : String
                },
                lecture_slides : {
                    lec_id : String
                },
                notes : {
                    notes_url : String
                },

                video : {
                    vid_url : String,
                    videoInfo: String
                }
            }
        }
    }
});