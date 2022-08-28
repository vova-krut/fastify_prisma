import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const productInput = {
    title: z.string({
        required_error: "Product title is required",
    }),
    price: z.number({
        required_error: "Product price is required",
    }),
    content: z.string().optional(),
};

const productGenerated = {
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
};

const createProductSchema = z.object({
    ...productInput,
});

const productResponseSchema = z.object({
    ...productGenerated,
    ...productInput,
    owner: z.object({
        id: z.number(),
        name: z.string(),
    }),
});

const productsResponseSchema = z.array(productResponseSchema);

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const { schemas: productSchemas, $ref } = buildJsonSchemas(
    {
        createProductSchema,
        productResponseSchema,
        productsResponseSchema,
    },
    {
        $id: "ProductSchemas",
    }
);
