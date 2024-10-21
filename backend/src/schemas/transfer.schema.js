import { z } from "zod";

const transferSchema = z.object({
    transactionId: z
    .string({
        required_error: "transactionId is required"
    })
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid transactionId")
})
.strict();

export default transferSchema;