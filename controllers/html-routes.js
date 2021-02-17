const db = require('../models');

module.exports = function (app) {
    app.get("/", function (req, res) {
        db.ViewParty.findAll({}).then(function (data) {
            const hbsObject = {
                parties: data
            };
            res.render("index", hbsObject);
        }).catch(function (err) {
            const hbsObject = {
                parties: []
            };
            res.render("index", hbsObject);
        });

    });

    app.get("/movie/:movieId", function (req, res) {
        db.ViewParty.findAll({ where: { OMDBId: req.params.movieId } }).then(function (data) {
            const hbsObject = {
                parties: data
            };
            console.log(hbsObject);
            res.render("movieDiscussion", hbsObject);
        }).catch(function (err) {
            const hbsObject = {
                parties: []
            };
            res.render("movieDiscussion", hbsObject);
        });
    });

    app.get("/view/:viewId", function (req, res) {
        db.Chat.findAll({ where: { ViewPartyId: req.params.viewId } }).then(function (data) {
            db.ViewParty.findByPk(req.params.viewId).then(function (party) {
                const hbsObject = {
                    OMDBId: party.OMDBId,
                    roomName: party.roomName,
                    partyId: party.id,
                    movieName: party.movieName,
                    chats: data
                }
                console.log(data);
                res.render("viewParty", hbsObject);

            }).catch(function (err) {
                res.sendStatus("500");
                throw err;
            });
        }).catch(function (err) {
            res.sendStatus("500");
            throw err;
        });
    });
}