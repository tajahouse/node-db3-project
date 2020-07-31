const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
    update,
    remove
}

function find(){
    return db('schemes')
}

function findById(id){
    return db('schemes')
    .where({ id })
    .first();
}

function findSteps(id) {
    return db('steps')
    .join('schemes', 'scheme_id', '=', 'steps.scheme_id')
    .select( 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
    .where({'schemes.id' : id})
    .orderBy('step_number', 'asc')
    .then(steps => {
        if (steps) {
            return steps;
        } else {
             return null;
        }
    });
 }

function addStep(step){
    return db('steps')
    .insert(step, 'id')
    .then(([id]) => {
        return findById(id);
    })
}

function add(scheme){
    return db('schemes')
    .insert(scheme, 'id')
    .then(([id]) => {
        return findById(id)
    })
}

function update(scheme, id){
    return db('schemes')
    .where('id', Number(id))
    .update(scheme)
}

function remove(id){
    return db('schemes')
    .where('id', Number(id))
    .del();
}