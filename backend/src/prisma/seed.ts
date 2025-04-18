import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    await prisma.product.createMany({
        data: [
            {
                name: "Auriculares Inalámbricos",
                description: "Bluetooth, con cancelación de ruido.",
                price: 199.99,
                stock: 50,
            },
            {
                name: "Teclado Mecánico",
                description: "Retroiluminado, switches rojos.",
                price: 129.99,
                stock: 35,
            },
            {
                name: "Mouse Gamer",
                description: "12 botones, DPI ajustable.",
                price: 79.99,
                stock: 42,
            },
            {
                name: "Monitor 4K",
                description: "32 pulgadas, tasa de refresco 144Hz.",
                price: 399.99,
                stock: 12,
            },
            {
                name: "Silla Ergonómica",
                description: "Ideal para largas sesiones de trabajo.",
                price: 249.99,
                stock: 20,
            },
        ],
    });

    console.log("🌱 Seed completada con éxito");
}

main()
    .catch((e) => {
        console.error("Error al hacer seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
