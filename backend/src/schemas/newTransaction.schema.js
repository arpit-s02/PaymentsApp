import { z } from "zod";

const newTransactionSchema = z
.object({
    recipientId: z.string({
        required_error: "recipientId is required"
    }).regex(/^[0-9a-fA-F]{24}$/, "Invalid recipientId"),
    amount: z.number({
        required_error: "amount is required"
    }).gte(1, "Minimum amount that can be sent is 1 rupee")
})
.strict();

export default newTransactionSchema;