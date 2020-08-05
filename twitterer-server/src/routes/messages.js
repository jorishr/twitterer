const   express     = require('express'),
        router      = express.Router({ mergeParams: true}),
        { createMessage } = require('../handlers/messages');

// prefix - /api/users/:id/messages
router.post('/', createMessage);

module.exports = router;