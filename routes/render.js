const query = require('../database/queries')
const config = require("../database/config");

module.exports = {
	Index: async (req, res) => {
		let db = await config();

		try {
			await db.query(query.start);
			let _problems = await db.query(query.get_problems);
			await db.query(query.commit);

			return res.render('index.ejs',{
				title : 'Question Addition Platform',
				problems : _problems
			})
		}
		catch (ex) {
			await db.query(query.rollback);
			return res.send("Some Error Occured\n"+ex);
		}
		finally {
			await db.release();
			await db.destroy();
		}
	},
	addPlayerPage: (req, res) => {
        return res.render('add-player.ejs', {
            title: 'Question Addition Platform | Add a new player'
            ,message: ''
        });
    },
    editPlayerPage: async (req, res) => {
    	let db = await config();
    	try {
    		//capturing parameters
    		let _pid = req.params.id;

    		await db.query(query.start);
    		let _problem = await db.query(query.get_problem, [_pid]);
    		await db.query(query.commit);

    		return res.render('edit-problem.ejs', {
    			title: 'EDIT PROBLEM ' + _pid,
    			problem: _problem[0],
    			message: ''
    		})
    	}
    	catch (ex) {
    		await db.query(query.rollback);
    		return res.send("Some Error Occurred\n" + ex);
    	}
    	finally {
    		await db.release();
    		await db.destroy();
    	}
    },
    viewPlayerPage: async (req, res) => {
        let db = await config();
    	try {
    		//capturing parameters
    		let _pid = req.params.id;

    		await db.query(query.start);
    		let _problem = await db.query(query.get_problem, [_pid]);
    		await db.query(query.commit);

    		return res.render('view-problem.ejs', {
    			title: 'VIEW PROBLEM ' + _pid,
    			problem: _problem[0],
    			message: ''
    		})
    	}
    	catch (ex) {
    		await db.query(query.rollback);
    		return res.send("Some Error Occurred\n" + ex);
    	}
    	finally {
    		await db.release();
    		await db.destroy();
    	}
    }
}