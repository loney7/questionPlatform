module.exports = {
	start: `START TRANSACTION`,
    commit:  `COMMIT`,
    rollback: `ROLLBACK`,
    get_problems : `SELECT * FROM problems`, 
    insert_problem: `INSERT INTO tbl_todo(title, completed) VALUES(?, ?)`,
    read_problem: `SELECT * FROM tbl_todo`,
    update_problem: `UPDATE tbl_todo SET tbl_todo.title = ?, tbl_todo.completed = ? WHERE tbl_todo.id = ?`,
    delete_problem: `DELETE FROM tbl_todo WHERE tbl_todo.id = ?`
}