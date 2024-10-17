import { z } from "zod";

const signupSchema = z.object({
    firstName: z.string({
        invalid_type_error: "First name must be a string",
        required_error: "First name is required"
    })
    .min(3, "First name must have atleast three characters"),
    lastName: z.string().optional(),
    email: z.string({
        required_error: "Email is required"
    })
    .email({ message: "Invalid Email" }),
    password: z.string({
        required_error: "Password is required"
    })
    .min(8, "Password must have atleat 8 characters"),
})

export default signupSchema;