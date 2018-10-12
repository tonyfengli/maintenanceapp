var db = require("../models");


module.exports = function(app, workorders) {

    app.post("/api/workorders", function(req, res) {
        workorders.create(req.body).then(function(data) {
            res.json(data);
        });
    });


};