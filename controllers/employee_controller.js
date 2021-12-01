/* === Boiler Plate ===
     Gabriel Breeding
    Employee Controller
        10/5/2021
   ==================== */
const express = require('express');
const employeeRouter = express.Router();
const Employee = require('../models/employee_model');

// GET ALL *
employeeRouter.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

// GET ONE *
employeeRouter.get('/:id', getEmployeeID, (req, res) => {
    res.json(res.employee);
})


// POST CREATE
employeeRouter.post('/', async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        department: req.body.department,
        salary: req.body.salary,
        hireDate: req.body.hireDate
    })
    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(400).json({message: err.Message});
    }
})

// PUT
employeeRouter.put('/:id', getEmployeeID, async (req, res) => {
    if (req.body.name === null) { res.employee.name = req.employee.name} else {
        res.employee.name = req.body.name;
    }
    if (req.body.department === null) {} else {
        res.employee.department = req.body.department;
    }
    if (req.body.salary === null) {} else {
        res.employee.salary = req.body.salary;
    }
    if (req.body.hireDate === null) {} else {
        res.employee.hireDate = req.body.hireDate;
    }

    try {
        const updatedEmployee = await req.employee.save();
        res.status(201).json(updatedEmployee);
    } catch(err) {
        res.status(400).json({message: "something went wrong here (0)"})
    }
})

// DELETE
employeeRouter.delete('/:id', getEmployeeID, async (req, res) => {
    try {
        await res.employee.remove();
        res.json({message: "Employee Deleted"});
    } catch(err) {
        res.status(500).json({message: err.Message});
    }
})


async function getEmployeeID(req, res, next) {
    try {
        employee = await Employee.findById(req.params.id);
        if (employee === null) {
            return res.status(404).json({message: "Cannot find that employee"})
        }
    } catch(err) {
        return res.status(500).json({message: err.Message});
    }
    res.employee = employee;
    next();
}

/*
GET All: http://localhost:5002/employees 
GET Onl: http://localhost:5002/employees/id 
POST CREATE: http://localhost:5002/employees 
PATCH: http://localhost:5002/employees/id
DELETE:http://localhost:5002/employees/id
*/
module.exports = employeeRouter;


