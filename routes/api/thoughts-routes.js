const router = require('express').Router(); 
const { Thoughts } = require('./../../models/Thoughts')
const { User } = require('./../../models/User')

router.get('/', async (req, res) => {
    try {
        const thoughts = await Thoughts.find();
        res.json(thoughts)
    } catch (error) {
        res.status(500).json({ error })
    }
   
});

router.get('/:thoughtId', async (req, res) => {
    try {
        const thoughtsPerId = await Thoughts.findById({_id: req.params.thoughtId})
        res.json(thoughtsPerId);  
    } catch (error) {
        res.status(500).json({ error })
    }
});

router.post('/', async (req, res) => {
    try {
        const thoughtText = req.body.thoughtText;
        const username = req.body.username;
        const newThoughts = await Thoughts.create({
            thoughtText: thoughtText,
            username: username,
        });
        const userUpdate = await User.findOneAndUpdate(
            {
                username: username
            },
            {
                $push: {
                    thoughts: [newThoughts]
                }
            }
        );
        res.json(newThoughts);
    } catch (error) {
        res.status(500).json({ error })
    }
})


module.exports = router;