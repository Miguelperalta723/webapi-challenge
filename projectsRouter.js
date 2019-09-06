const express = require('express');
const Projects = require('./data/helpers/projectModel.js')
const router = express.Router();
router.use(express.json())

router.get('/', (req , res) => {
    Projects.get()
    .then(projects => res.status(200).json(projects))
});

router.post('/' , (req , res) => {
    const newProject = req.body;
    Projects.insert(newProject)
    .then(addedProject => {
        res.status(200).json(addedProject)
    })
    .catch(() => {
        res.status(500).json({
            error: 'error adding project'
        });
    });
});

router.put('/:id' ,(req , res) => {
    const { id } = req.params;
    const changes = req.body;
    Projects.update(id, changes)
    .then(updatedProject => {
        res.status(200).json(updatedProject)
    })
    .catch(() => {
        res.status(500).json({
            error: 'error updating project'
        });
    });
});


router.delete('/:id' , (req , res) => {
    const { id } = req.params;
    Projects.remove(id)
    .then(deletedProject => {
        res.status(200).json(deletedProject)
    })
    .catch(() => {
        res.status(500).json({
            error: 'error deleting project'
        })
    })
})



module.exports = router;