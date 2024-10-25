const personService = require('../services/personService');

const getAllPersons = (req, res) => {
    res.json(personService.getAllPersons());
};

const getPersonById = (req, res) => {
    try {
        const person = personService.getPersonById(req.params.personId);
        res.json(person);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const createPerson = (req, res) => {
    try {
        const newPerson = personService.createPerson(req.body);
        res.status(200).json(newPerson);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const updatePerson = (req, res) => {
    try {
        const updatedPerson = personService.updatePerson(req.params.personId, req.body);
        res.json(updatedPerson);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const deletePerson = (req, res) => {
    try {
        personService.deletePerson(req.params.personId);
        res.status(204).send();
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

module.exports = { getAllPersons, getPersonById, createPerson, updatePerson, deletePerson };
