import { Product } from "@/app/types";
import { faker } from "@faker-js/faker";

export const generateMockProduct = (): Product => ({
  id: faker.string.uuid(),
  amount: faker.number.int({ min: 1, max: 100 }),
  createdAt: faker.date.past(),
  date: faker.date.recent(),
  image: faker.image.urlLoremFlickr({ category: "technics" }),
  number: faker.string.alphanumeric({ length: 10, casing: "upper" }),
  price: faker.number.int({ min: 500, max: 5000, multipleOf: 100 }),
  title: faker.commerce.productName(),
});
