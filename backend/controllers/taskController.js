import pool from "../bd/connection.js";


// GET /api/health
export const healthCheck = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "API running correctly"
    });
};


// GET /api/tasks
export const getTasks = async (req, res) => {
    try {

        const result = await pool.query(`
            SELECT *
            FROM tasks
            ORDER BY created_at DESC
        `);

        res.status(200).json(result.rows);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// GET /api/tasks/:id
export const getTaskById = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `SELECT * FROM tasks WHERE id = $1`,
            [id]
        );

        if(result.rows.length === 0){

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });

        }

        res.status(200).json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// POST /api/tasks
export const createTask = async (req, res) => {

    try {

        const { title, description, status, category_id } = req.body;

        if(!title){

            return res.status(400).json({
                success: false,
                message: "Title is required"
            });

        }

        const result = await pool.query(
            `
            INSERT INTO tasks(title, description, status, category_id)
            VALUES($1, $2, $3, $4)
            RETURNING *
            `,
            [
                title,
                description || null,
                status || "pending",
                category_id || null
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// PUT /api/tasks/:id
export const updateTask = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            description,
            status,
            category_id
        } = req.body;

        const result = await pool.query(
            `
            UPDATE tasks
            SET
                title = $1,
                description = $2,
                status = $3,
                category_id = $4,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $5
            RETURNING *
            `,
            [
                title,
                description,
                status,
                category_id,
                id
            ]
        );

        if(result.rows.length === 0){

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });

        }

        res.status(200).json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            DELETE FROM tasks
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );

        if(result.rows.length === 0){

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};