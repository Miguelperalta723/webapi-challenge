const express = require('express');
const Actions = require('./data/helpers/actionModel.js')
const Projects = require('./data/helpers/projectModel')
const router = express.Router();
router.use(express.json())

router.get('/', (req , res) => {
    Actions.get()
    .then(projects => res.status(200).json(projects))
});

router.post('/' , validateProjectId, (req , res) => {
    const newAction = req.body;
    Actions.insert(newAction)
    .then(addedAction => {
        res.status(200).json(addedAction)
    })
    .catch(() => {
        res.status(500).json({
            error: 'error adding action'
        });
    });
});

router.put('/:id' ,(req , res) => {
    const { id } = req.params;
    const changes = req.body;
    Actions.update(id, changes)
    .then(updatedAction => {
        res.status(200).json(updatedAction)
    })
    .catch(() => {
        res.status(500).json({
            error: 'error updating action'
        });
    });
});


router.delete('/:id' , (req , res) => {
    const { id } = req.params;
    Actions.remove(id)
    .then(deletedAction => {
        res.status(200).json(deletedAction)
    })
    .catch(() => {
        res.status(500).json({
            error: 'error deleting project'
        })
    })
})



//actions middleware

function validateProjectId(req , res, next){
    Projects.get(req.body.project_id)
    .then(project => {
        if(project){
            next()
        } else {
            res.status(500).json({
            error: "error this project id does not exist"
            })
        }
    })
};


module.exports = router;