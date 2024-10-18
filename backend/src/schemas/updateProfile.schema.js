import { z } from "zod";

const updateProfileSchema = z.object({
    firstName: z.string({
        invalid_type_error: "First name must be a string"
    }).optional(),
    lastName: z.string({
        invalid_type_error: "Last name must be a string"
    }).optional(),
    password: z.string({
        invalid_type_error: "Password must be a string",
    }).min(8, "Password must have atleast 8 characters").optional()
}).strict();

export default updateProfileSchema;