import { z } from "zod";

const signupSchema = z.object({
    firstName: z.string({
        invalid_type_error: "First name must be a string",
        required_error: "First name is required"
    }),
    lastName: z.string({
        invalid_type_error: "Last name must be a string",
        required_error: "Last name is required"
    }),
    email: z.string({
        required_error: "Email is required"
    })
    .email({ message: "Invalid email address" }),
    password: z.string({
        invalid_type_error: "Password must be a string",
        required_error: "Password is required"
    })
    .min(8, "Password must have atleat 8 characters"),
}).strict();

export default signupSchema;