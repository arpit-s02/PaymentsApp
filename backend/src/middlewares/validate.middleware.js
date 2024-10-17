const validate = (schema, input) => (req, res, next) => {
    try {
        const { error } = schema.safeParse(req[input]);
    
        if(error) {
            const err = new Error();
            err.message = error.issues.map(issue => issue.message).join(", ");
            err.status = 400;
    
            next(err);
        }
    
        next();
    } catch (error) {
        next(error);
    }
}

export default validate;