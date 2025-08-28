const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required:[true,'title is required'] // FIX: Changed 'require' to 'required'
    },
    description:{
        type: String,
        required:[true,'description is required'] // FIX: Changed 'require' to 'required'
    },
    image:{
        type: String,
        required:[true,'image is required'] // FIX: Changed 'require' to 'required'
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true,'user id is required'] // FIX: Changed 'require' to 'required'
    },
},{timestamps:true})

const blogModel = mongoose.model('Blog',blogSchema);
module.exports = blogModel;
