"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddHandler = createAddHandler;
exports.createDeleteHandler = createDeleteHandler;
const errors_1 = require("./errors");
function createAddHandler(type, addFn) {
    return async function handleAdd(req, res) {
        try {
            const { values, mode } = req.body;
            if (!values || !Array.isArray(values) || !mode) {
                return res.status(400).json({ error: 'Missing or invalid values/mode' });
            }
            const result = await addFn(values, mode);
            return res.status(201).json({
                type,
                mode,
                values: result,
                status: 'success',
            });
        }
        catch (err) {
            console.error(`Error in ${type} add handler:`, err);
            if (err instanceof errors_1.BadRequestError) {
                return res.status(err.statusCode).json({ error: err.message });
            }
            res.status(500).json({ error: 'Internal server error' });
        }
    };
}
function createDeleteHandler(type, deleteFn) {
    return async function handleDelete(req, res) {
        try {
            const { values, mode } = req.body;
            if (!values || !Array.isArray(values) || !mode) {
                return res.status(400).json({ error: 'Missing or invalid values/mode' });
            }
            const result = await deleteFn(values, mode);
            return res.status(200).json({
                type,
                mode,
                values: result,
                status: 'success',
            });
        }
        catch (err) {
            console.error(`Error in ${type} delete handler:`, err);
            if (err instanceof errors_1.BadRequestError) {
                return res.status(err.statusCode).json({ error: err.message });
            }
            res.status(500).json({ error: 'Internal server error' });
        }
    };
}
//# sourceMappingURL=ruleHandlers.js.map