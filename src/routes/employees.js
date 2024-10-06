const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employeesController");

// Definir las rutas
router.get("/", employeesController.getEmployees); // Esta ruta maneja paginación, filtrado por privilegios y badges
router.get("/oldest", employeesController.getOldestEmployee);
router.get("/:name", employeesController.getEmployeeByName);
router.post("/", employeesController.addEmployee);

module.exports = router;
