/**
 * API Index methods
 */

var settings = require('../../settings');
var _ = require('underscore');

var routes = {};

routes[settings.apiPrefix + '/info'] =  {
    methods: ['get'],
    middleware: [],
    fn: function(req, res, next) {
        res.json(
            {
                'response': 'successful',
                'user': req.user,
                'session': req.sessionID
            }
        );
    }
};

routes[settings.apiPrefix + '/perms'] =  {
    methods: ['get'],
    middleware: [],
    fn: function(req, res, next) {
        res.json(
            {
                'response': 'successful',
                'perms': req.user ? req.user.roles : []
            }
        );
    }
};

routes[settings.apiPrefix + '/room'] =  {
    methods: ['post'],
    middleware: [],
    fn: function(req, res, next) {
        if (_.isEmpty(req.session.chats)) {
            req.session.chats = [];
        }
        // Check if room is correct
        // TODO: check with validator if is ObjectId
        if (req.body.room.indexOf('undefined') === -1) {
            // If this room does not exist in session, It is saved now.
            var isInSession = _.some(req.session.chats, function (room) {
                console.log(room);
                return room === req.body.room;
            });
            if (!isInSession)
                req.session.chats.push(req.body.room);
        }
        res.json(
            {
                'response': 'successful'
            }
        );
    }
};

module.exports = routes;
