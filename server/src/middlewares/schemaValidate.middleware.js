const validateSchema = (schema) => async (req, res, next) => {
    try {

        //req data pass to zod 
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
        
    } catch (error) {
        const status = error.status || 400; // Default status code if not provided
        const message = "fill properly";
        let extraDetails = "";
        
        // Check if error has errors array and it has elements
        if (error.errors && error.errors.length > 0) {
            extraDetails = error.errors[0].message;
        }

        const err = { status, message, extraDetails };
        next(err);
    }
};

module.exports = {validateSchema}
