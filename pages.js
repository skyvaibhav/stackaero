var mongoose = require( 'mongoose' ),
    Card = mongoose.model('card'),
    List = mongoose.model('list');

exports.createList = function (req, res) {
    List.create(req.body, function(err, list) {
        if (err) {
            console.log(err);
        } else {
            res.json(list);
        }
    });
};

exports.createCard = function (req, res) {
    Card.create(req.body, function(err, card) {
        if (err) {
            console.log(err);
        } else {
            List.findOneAndUpdate(req.params, {$push: {card: card._id}}, function (listErr, listResp){
                if(listErr) {
                    console.log(listErr);
                } else {
                    res.json(listResp);
                }
            });
        }
    });
};

exports.updateDoc = function (req, res) {
    var dataObj = req.body;
    var paramObj = req.params;
    console.log(req.params.Country);
    List.findOneAndUpdate({Country: req.params.Country}, {Country: 'Pizza'}, function(err, list) {
        //var strOutput;
        //res.writeHead(200, { 'Content-Type': 'text/plain' });
        if (err) {
            console.log(err);
            //strOutput = 'Oh dear, we\'ve got an error';
        } else {
            console.log('List created: ' + list);
            //strOutput = list.Country + ' created in Group ' + list.GroupName + '\nat ' + list.CreatedOn;
            res.json(list);
        }
        //res.end();
    });
};


exports.getCard = function (req, res) {
    Card.find({}, function(err, card) {
        if (err) {
            console.log(err);
        } else {
            console.log('Card created: ' + card);
            res.json(card);
        }
    });
};

exports.getList = function (req, res) {
    List
        .find()
        .populate('card')
        .exec(function(err, list) {
        if (err) {
            console.log(err);
        } else {
            console.log('List created: ' + list);
            res.json(list);
        }
    });
};