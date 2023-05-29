
interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Pendiente: Test description 1",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "En-Progreso: Test description 2",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description: "Terminada: Test description 3",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};
