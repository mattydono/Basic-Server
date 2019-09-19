const members = [
    {
        id: 1
    },
    {
        id: 2
    },
    {
        id: 3
    }
]

const express = require('express')
const router = express.Router()

// get all members

router.get('/', (req, res) => res.json(members))

// get single member

router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id)) // some returns true or false
    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
})

// create member

router.post('/', (req, res) => {
    const newMember = {
        id: 4,
        name: req.body.name,
        email: req.body.email,
        state: 'active'
    }

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({msg: 'Please include a name and email'})
    }

    members.push(newMember)
    res.json(members)
})

// Update member

router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id)) // some returns true or false
    if(found) {
        const updateMember = req.body
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name
                member.email = updateMember.email ? updateMember.email : member.email

                res.json({msg: 'Member updated', member})
            }
        })
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
})

// Delete member

router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id)) // some returns true or false
    if(found) {
        res.json({msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))})
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
})

module.exports = router