const express = require("express");
const employeesRouter = require("./routes/employees");

const app = express();
const PORT = 8000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/api/employees", employeesRouter);

// Exporta la aplicación sin iniciar el servidor
module.exports = app;

// Si se ejecuta directamente (es decir, no en un test), inicia el servidor
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}
