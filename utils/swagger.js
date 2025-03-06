import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",  // Use "3.0.0" instead of "3.1.0"
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "E-Commerce API documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Adesh",
        email: "adesh.yearanty@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"],  // Ensure route files exist and have Swagger annotations
};

export const specs = swaggerJsdoc(options);