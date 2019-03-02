const query = require('../database/queries')
const config = require("../database/config");

module.exports = {
	addPlayer: async (req, res) => {
		let db = await config();

		try {
			//capturing paramters
			let message = '';
       		let ProbStat = req.body.ProbStat;
        	let Input = req.body.Input;
        	let Output = req.body.Output;
        	let Constraints = req.body.Constraints;
        	let timeLimit = req.body.timeLimit;
            let diffLevel = req.body.diffLevel;
            let tags = req.body.tags;
            let author = req.body.author;

            //Inserting into database
			await db.query(query.start);
			await db.query(query.insert_problem, [ProbStat, Input, Output, Constraints, timeLimit, diffLevel, tags, author]);
			await db.commit(query.commit);

			return res.redirect('/');            			
		}
		catch (ex) {
			await db.query(query.rollback);
			return res.send("Some Error Occured\n" + ex);
		}
		finally {
			await db.release();
			await db.destroy();
		}
    },
    editPlayer: async (req, res) => {
    	let db = await config();

		try {
			//capturing paramters
			let message = '';
			let Pid = req.params.id;
       		let ProbStat = req.body.ProbStat;
        	let Input = req.body.Input;
        	let Output = req.body.Output;
        	let Constraints = req.body.Constraints;
        	let timeLimit = req.body.timeLimit;
            let diffLevel = req.body.diffLevel;
            let tags = req.body.tags;
            let author = req.body.author;

            //Updating the database
			await db.query(query.start);
			await db.query(query.update_problem, [ProbStat, Input, Output, Constraints, timeLimit, diffLevel, tags, author, Pid]);
			await db.commit(query.commit);

			return res.redirect('/');            			
		}
		catch (ex) {
			await db.query(query.rollback);
			return res.send("Some Error Occured\n" + ex);
		}
		finally {
			await db.release();
			await db.destroy();
		}
    },
    deletePlayer: async (req, res) => {

        let db = await config();

		try {
			//capturing paramters
			let Pid = req.params.id;

            //Updating the database
			await db.query(query.start);
			await db.query(query.delete_problem, [Pid]);
			await db.commit(query.commit);

			return res.redirect('/');            			
		}
		catch (ex) {
			await db.query(query.rollback);
			return res.send("Some Error Occured\n" + ex);
		}
		finally {
			await db.release();
			await db.destroy();
		}
	}
};