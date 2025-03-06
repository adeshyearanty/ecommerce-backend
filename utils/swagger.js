import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "API documentation for E-Commerce Backend",
    },
    servers: [{ url: "http://localhost:4000" }],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }], // Global security (Optional)
  },
  apis: ["./routes/*.js"], // Ensure all your route files are included
};

export const specs = swaggerJsdoc(options);
