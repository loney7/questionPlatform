module.exports = {
	start: `START TRANSACTION`,
    commit:  `COMMIT`,
    rollback: `ROLLBACK`,

    get_problems : `SELECT * FROM problems`,
    get_problem : `SELECT * FROM problems WHERE Pid = ?`, 
    

    insert_problem: `INSERT INTO problems (ProbStat, Input, Output, Constraints, timeLimit, diffLevel, tags, author) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
    read_problem: `SELECT * FROM tbl_todo`,
    update_problem: `UPDATE problems SET ProbStat = ?, Input = ?, Output = ?, Constraints = ?, timeLimit = ?, diffLevel = ?, tags = ?, author = ? WHERE Pid = ?`,
    delete_problem: `DELETE FROM problems WHERE Pid = ?`
}