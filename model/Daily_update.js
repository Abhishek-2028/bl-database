const mongoose =require("mongoose")



var tasks = new mongoose.Schema({
      task:{
        type: String,
        required: true
      },
      emp_id:{
        type:String,
        required: true
      }
})

module.exports = mongoose.model("Daily_update",tasks);