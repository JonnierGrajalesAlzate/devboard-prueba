import pool from "../bd/connection.js";

export const getCategories = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT *
            FROM categories
            ORDER BY id ASC
        `);

        res.status(200).json(result.rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};