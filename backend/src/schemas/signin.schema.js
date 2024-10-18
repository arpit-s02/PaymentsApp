import { z } from "zod";

const signinSchema = z.object({
    email: z.string({
        required_error: "email is required",
        invalid_type_error: "email must be a string"
    }),
    password: z.string({
        required_error: "password is required",
        invalid_type_error: "password must be a string"
    })
}).strict();

export default signinSchema;