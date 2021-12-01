/* === Boiler Plate ===
     Gabriel Breeding
      Employee Model
        10/5/2021
   ==================== */
const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: false
    },
    salary: {
        type: Number,
        required: false
    },
    hireDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Employee', employeeSchema);