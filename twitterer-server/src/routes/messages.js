const   express     = require('express'),
        router      = express.Router({ mergeParams: true}),
        { createMessage, 
          getSingleMessage, 
          deleteMessage, 
        } = require('../handlers/messages');

// prefix - /api/users/:id/messages
// prefix - /api/users/:id/messages/:message_id
router.post('/', createMessage);
router.get('/:message_id', getSingleMessage);
router.delete('/:message_id', deleteMessage);

module.exports = router;