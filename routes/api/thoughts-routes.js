const router = require('express').Router(); 
const { Thoughts } = require('./../../models/Thoughts')
const { User } = require('./../../models/User')

router.get('/', async (req, res) => {
    try {
        const thoughts = await Thoughts.find().populate('reactions');
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
});

router.put('/:thoughtId', async (req, res) => {
    try {
        const thoughtsUpdate = await Thoughts.findByIdAndUpdate(
            {
                _id: req.params.thoughtId
            },
            {
                thoughtText: req.body.thoughtText,
                username: req.body.username, 
            },
            {
                new: true,
            }
        );
        res.json(thoughtsUpdate);
    } catch (error) {
        res.status(500).json({ error })
    }
});

router.delete('/:thoughtsId', async (req, res) => {
    try {
        const thoughtsDelete = await Thoughts.findByIdAndDelete(
            {
                _id: req.params.thoughtsId
            }
        );
        res.json(thoughtsDelete);
    } catch (error) {
        res.status(500).json({ error })
    }
});

router.post('/:thoughtsId/reactions', async (req, res) => {
    try {
        const newReaction = {
            reactionBody: req.body.reactionBody,
            username: req.body.username,
        }
        const reactionNew = await Thoughts.findByIdAndUpdate(
            {
                _id: req.params.thoughtsId
            },
            {
                $addToSet: {reactions: newReaction}  
            }
        );
        res.json(reactionNew);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
});

router.delete('/:thoughtsId/reactions/:reactionId', async (req, res) => {
    try {
        const reactionDelete = await Thoughts.findByIdAndUpdate(
            {
                _id: req.params.thoughtsId
            },
            {
                $pull: {reactions: { _id: req.params.reactionId}}
            },
            {
                new: true
            }
        );
        res.json(reactionDelete);
    } catch (error) {
        res.status(500).json({ error })
    }
});


module.exports = router;

// 631842900ca06b3bcfcbe905