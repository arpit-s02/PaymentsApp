import { z } from "zod";

const tranferSchema = z
.object({
    receiverId: z.string({
        required_error: "receiverId is required"
    }).regex(/^[0-9a-fA-F]{24}$/, "Invalid receiverId"),
    amount: z.number({
        required_error: "amount is required"
    }).gte(1, "Minimum amount that can be sent is 1 rupee")
})
.strict();

export default tranferSchema;