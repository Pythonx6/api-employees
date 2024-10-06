const request = require("supertest");
const app = require("../src/app"); // Asegúrate de que la ruta sea correcta según tu estructura

describe("API Employees", () => {
  // Test para obtener todos los empleados
  it("debería devolver todos los empleados", async () => {
    const res = await request(app).get("/api/employees");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test para obtener el empleado más antiguo
  it("debería devolver el empleado más antiguo", async () => {
    const res = await request(app).get("/api/employees/oldest");
    expect(res.statusCode).toEqual(200);
    expect(res.body.age).toBeGreaterThan(0);
  });

  // Test para buscar empleado por nombre
  it("debería devolver un empleado por nombre", async () => {
    const res = await request(app).get("/api/employees/John Doe");
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe("John Doe");
  });

  // Test para devolver empleados con badge "black"
  it('debería devolver empleados con badge "black"', async () => {
    const res = await request(app).get("/api/employees?badges=black");
    expect(res.statusCode).toEqual(200);
    const hasBlackBadge = res.body.some((emp) => emp.badges.includes("black"));
    expect(hasBlackBadge).toBe(true);
  });
});
