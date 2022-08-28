import prisma from "../../utils/prisma";
import { CreateProductInput } from "./product.schema";

const select = {
    id: true,
    title: true,
    content: true,
    price: true,
    createdAt: true,
    updatedAt: true,
    owner: {
        select: {
            id: true,
            name: true,
        },
    },
};

class ProductService {
    async createProduct(data: CreateProductInput & { ownerId: number }) {
        return prisma.product.create({
            data,
        });
    }

    async getProducts() {
        return prisma.product.findMany({ select });
    }

    async getProductById(id: number) {
        return prisma.product.findUnique({ where: { id }, select });
    }
}

export default new ProductService();
