const fs = require('fs');

module.exports = {
    addPlayerPage: (req, res) => {
        res.render('add-player.ejs', {
            title: 'Welcome to Socka | Add a new player'
            ,message: ''
        });
    },
    addPlayer: (req, res) => {
        if (req.body.first_name) {
            /*return res.status(400).send("No files were uploaded.");*/
        }

        let message = '';
        let ProbStat = req.body.ProbStat;
        let Input = req.body.Input;
        let Output = req.body.Output;
        let Constraints = req.body.Constraints;
        let timeLimit = req.body.timeLimit;
         let diffLevel = req.body.diffLevel;
          let tags = req.body.tags;
           let author = req.body.author;
        /*let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = username + '.' + fileExtension;*/

        let usernameQuery = "SELECT * FROM `problems` WHERE ProbStat = '" + ProbStat + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Problem already exists';
                res.render('add-player.ejs', {
                    message,
                    title: 'Welcome to Socka | Add a new player'
                });
            } else {
                // check the filetype before uploading it
                /*if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }*/
                        // send the player's details to the database
                         let query = "INSERT INTO `problems` (ProbStat, Input, Output, Constraints, timeLimit, diffLevel,tags,author) VALUES ('" +
                            ProbStat + "', '" + Input + "', '" + Output + "', '" + Constraints + "',  '" + timeLimit + "',  '" + diffLevel + "',  '" + tags + "',  '" + author + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                    };
                 /*else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('add-player.ejs', {
                        message,
                        title: 'Welcome to Socka | Add a new player'
                    });
                }*/
            
        });
    },
    editPlayerPage: (req, res) => {
        let Pid = req.params.id;
        let query = "SELECT * FROM `problems` WHERE Pid = '" + Pid + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            
            res.render('edit-player.ejs', {
                title: 'Edit  Player'
                ,problem: result[0]
                ,message: ''
            });
        });
    },
    editPlayer: (req, res) => {

        let Pid = req.params.id;
        let ProbStat = req.body.ProbStat;
        let Input = req.body.Input;
        let Output = req.body.Output;
        let Constraints = req.body.Constraints;
        let timeLimit = req.body.timeLimit;
        let diffLevel = req.body.diffLevel;
        let tags = req.body.tags;
        let author = req.body.author;
        console.log(Pid);
        console.log(req.params.id);

        console.log("before");
        let query = "UPDATE `problems` SET `ProbStat` = '" + ProbStat + "', `Input` = '" + Input + "', `Output` = '" + Output + "', `Constraints` = '" + Constraints + "', `timeLimit` = '" + timeLimit + "', `diffLevel` = '" + diffLevel + "', `tags` = '" + tags + "', `author` = '" + author + "'  WHERE `problems`.`Pid` = '" + Pid + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
        console.log("after");
    },
    viewPlayerPage: (req, res) => {
        let Pid = req.params.id;
        let query = "SELECT * FROM `problems` WHERE Pid = '" + Pid + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            
            res.render('view-player.ejs', {
                title: 'View  Player'
                ,problem: result[0]
                ,message: ''
            });
        });
    },
    viewPlayer: (req, res) => {

        let Pid = req.params.id;
        let ProbStat = req.body.ProbStat;
        let Input = req.body.Input;
        let Output = req.body.Output;
        let Constraints = req.body.Constraints;
        let timeLimit = req.body.timeLimit;
        let diffLevel = req.body.diffLevel;
        let tags = req.body.tags;
        let author = req.body.author;
        console.log(Pid);
        console.log(req.params.id);

        res.redirect('/');
        
        // let query = "UPDATE `problems` SET `ProbStat` = '" + ProbStat + "', `Input` = '" + Input + "', `Output` = '" + Output + "', `Constraints` = '" + Constraints + "', `timeLimit` = '" + timeLimit + "', `diffLevel` = '" + diffLevel + "', `tags` = '" + tags + "', `author` = '" + author + "'  WHERE `problems`.`Pid` = '" + Pid + "'";
        // db.query(query, (err, result) => {
        //     if (err) {
        //         return res.status(500).send(err);
        //     }
            
        // });
    },
    deletePlayer: (req, res) => {
        let Pid = req.params.id;
     
        let deleteUserQuery = 'DELETE FROM problems WHERE Pid = "' + Pid + '"';

                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
        
    }
};