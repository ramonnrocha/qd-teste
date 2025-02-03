import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addProductsDB() {
  const productCount = await prisma.product.count();

  if (productCount > 0) {
    return;
  }

  await prisma.product.createMany({
    data: [
      {
        name: "Hambúrguer Clássico",
        description: "Pão, carne e queijo",
        price: 19.99,
      },
      {
        name: "Pizza Margherita",
        description: "Molho de tomate, muçarela e manjericão",
        price: 29.99,
      },
      {
        name: "Coca-Cola 500ml",
        description: "Refrigerante gelado",
        price: 5.99,
      },
      {
        name: "Coca-Cola 2 l",
        description: "Refrigerante gelado",
        price: 9.99,
      },
    ],
  });
}

export { addProductsDB };
