const Joi = require('joi');

const Person = {
    id: '',  // auto gen UUID
    name: '',
    age: '',
    hobbies: []
};

// Joi validation schema for Person
const personSchema = Joi.object({
    id: Joi.string().min(1),
    name: Joi.string().required().min(1),
    age: Joi.number().required().min(0),
    hobbies: Joi.array().items(Joi.string()).required()
});

module.exports = { Person, personSchema };
