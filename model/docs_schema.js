const mongoose = require("mongoose")


var DocSchema = new mongoose.Schema({
    Doc_name: {
        type: String,
        required: true

    },
    Doc_img: {
        type: String,
        required: true

    },
    emp_doc_id: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("document", DocSchema);