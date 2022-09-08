const router = require('express').Router();
const { User } = require('./../../models/User')

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        .populate('thoughts')
        .populate('friends');
        res.json(users)
    } catch (error) {
        res.status(500).json({ error })
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const singleUser = await User.find({ _id: req.params.userId });
        res.json(singleUser);
    } catch (error) {
        res.status(500).json({ error })
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
        });
        res.json(newUser)
    } catch (error) {
        res.status(500).json({ error })
    }
});

router.put('/:userId', async (req, res) => {
    try {
        const userUpdate = await User.findByIdAndUpdate(
            {
                _id: req.params.userId,
            },
            {
                username: req.body.username,
                email: req.body.email
            },
            {
                new: true,
            }
        );
        res.json(userUpdate)
    } catch (error) {
        res.status(500).json({ error })
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        const userDelete = await User.findByIdAndDelete({ _id: req.params.userId });
        res.json(userDelete);
    } catch (error) {
        res.status(500).json({ error })
    }
});

router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const userFriends = await User.findByIdAndUpdate(
            {
                _id: req.params.userId,
            },
            {
                $addToSet: {
                    friends: req.params.friendId
                }
            }
        )
        res.json(userFriends);
    } catch (error) {
        res.status(500).json({ error })
    }
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {

        const userFriendsDelete = await User.findByIdAndUpdate(
            {
                _id: req.params.userId,
            },
            {
                $pull: {
                    friends: req.params.friendId
                }
            },
            {
                new: true
            }
        );
        res.json(userFriendsDelete);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
})

module.exports = router;

// 6316e4b7561d1797fa5f3334
// 6316ecd4b7105fea719d6a34