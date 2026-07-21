const request = require("supertest");
const app = require("../src/app");

describe("CI/CD sample application", () => {
  test("GET / returns application status", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.application).toBe(
      "GitHub Actions CI/CD Pipeline"
    );
    expect(response.body.status).toBe("running");
  });

  test("GET /health returns healthy status", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("healthy");
    expect(response.body.timestamp).toBeDefined();
  });

  test("GET /api/tasks returns task list", async () => {
    const response = await request(app).get("/api/tasks");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.tasks)).toBe(true);
    expect(response.body.tasks.length).toBeGreaterThan(0);
  });

  test("Unknown route returns 404", async () => {
    const response = await request(app).get("/unknown");

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Route not found");
  });
});