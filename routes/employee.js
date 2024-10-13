const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');


router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error });
    }
});


router.post('/employees', async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    try {
        const employee = new Employee({ first_name, last_name, email, position, salary, date_of_joining, department });
        await employee.save();
        res.status(201).json({ message: 'Employee created successfully.', employee_id: employee._id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating employee.', error });
    }
});

router.get('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee', error });
    }
});

router.put('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Employee details updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee', error });
    }
});

router.delete('/employees', async (req, res) => {
    const { eid } = req.query;

    try {
        await Employee.findByIdAndDelete(eid);
        res.status(204).json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error });
    }
});

module.exports = router;
