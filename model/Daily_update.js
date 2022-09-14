const mongoose =require("mongoose")





var tasks = new mongoose.Schema({
      task:{
        type: String,
        required: true
      },
     
      emp_sr:{
        type: String,
        required: true
      },
      Date:{
        type: Date,
        required :true,
        default: Date.now()
      }

    
})

module.exports = mongoose.model("Daily_update",tasks);