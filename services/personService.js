// services/personService.js
const { v4: uuidv4 } = require('uuid');
const { Person, personSchema } = require('../models/personModel');

// Custom error class for better error handling
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.statusCode = 400;
    }
}

let persons = [
    { id: '1', name: 'Sam', age: 26, hobbies: [] }
];

const getAllPersons = () => persons;

const getPersonById = (id) => {
    const person = persons.find(p => p.id === id);
    if (!person) throw new NotFoundError('Person not found');
    return person;
};

const createPerson = (data) => {
    const { error } = personSchema.validate(data);
    if (error) {
        throw new ValidationError(error.details.map(e => e.message).join(', ')); // Combine error messages
    }

    const newPerson = { id: uuidv4(), ...data };
    persons.push(newPerson);
    return newPerson;
};

const updatePerson = (id, data) => {
    const index = persons.findIndex(p => p.id === id);
    if (index === -1) throw new NotFoundError('Person not found');

    const { error } = personSchema.validate(data);
    if (error) {
        throw new ValidationError(error.details.map(e => e.message).join(', ')); // Combine error messages
    }

    persons[index] = { ...persons[index], ...data };
    return persons[index];
};

const deletePerson = (id) => {
    const index = persons.findIndex(p => p.id === id);
    if (index === -1) throw new NotFoundError('Person not found');

    persons.splice(index, 1);
    return true;
};

module.exports = { getAllPersons, getPersonById, createPerson, updatePerson, deletePerson, persons };
