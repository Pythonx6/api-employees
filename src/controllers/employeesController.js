const employees = require("../data/employees.json");

// Obtener todos los empleados
const getAllEmployees = (req, res) => {
  res.json(employees);
};

// Obtener el empleado más antiguo
const getOldestEmployee = (req, res) => {
  if (employees.length === 0) {
    return res.status(404).json({ code: "not_found" });
  }
  const oldestEmployee = employees.reduce((prev, current) => {
    return prev.age > current.age ? prev : current;
  });
  res.json(oldestEmployee);
};

// Obtener un empleado por nombre
const getEmployeeByName = (req, res) => {
  const employeeName = req.params.name;
  const employee = employees.find(
    (emp) => emp.name.toLowerCase() === employeeName.toLowerCase()
  );

  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ code: "not_found" });
  }
};

// Añadir un nuevo empleado con validaciones estrictas
const addEmployee = (req, res) => {
  const { name, age, privileges, badges } = req.body;

  // Validar que el nuevo empleado tenga los campos correctos
  if (!name || typeof name !== "string") {
    return res.status(400).json({
      code: "bad_request",
      message: "El campo 'name' es requerido y debe ser un string.",
    });
  }
  if (!age || typeof age !== "number" || age <= 0) {
    return res.status(400).json({
      code: "bad_request",
      message: "El campo 'age' es requerido y debe ser un número mayor que 0.",
    });
  }
  if (!privileges || (privileges !== "admin" && privileges !== "user")) {
    return res.status(400).json({
      code: "bad_request",
      message: "El campo 'privileges' debe ser 'admin' o 'user'.",
    });
  }
  if (
    !Array.isArray(badges) ||
    badges.length === 0 ||
    !badges.every((badge) => typeof badge === "string")
  ) {
    return res.status(400).json({
      code: "bad_request",
      message: "El campo 'badges' debe ser una lista de strings.",
    });
  }

  // Añadir el nuevo empleado si todas las validaciones pasaron
  const newEmployee = { name, age, privileges, badges };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
};

// Obtener empleados paginados o con privilegios de usuario
const getEmployees = (req, res) => {
  const isUser = req.query.user === "true";
  const page = parseInt(req.query.page) || 1;
  const limit = 3; // Mostramos 3 empleados por página
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  if (isUser) {
    const userEmployees = employees.filter((emp) => emp.privileges === "user");
    res.json(userEmployees);
  } else {
    const paginatedEmployees = employees.slice(startIndex, endIndex);
    res.json(paginatedEmployees);
  }
};

// Filtrar empleados por insignias (badges)
const getEmployeesByBadge = (req, res) => {
  const badge = req.query.badges;
  console.log(`Buscando por badge: ${badge}`);

  const filteredEmployees = employees.filter((emp) => {
    console.log(
      `Comparando badge: ${badge} con las badges del empleado: ${emp.badges}`
    );
    return emp.badges.includes(badge);
  });

  if (filteredEmployees.length > 0) {
    res.json(filteredEmployees);
  } else {
    res
      .status(200)
      .json({ message: `No se encontraron empleados con la badge: ${badge}` });
  }
};

module.exports = {
  getAllEmployees,
  getOldestEmployee,
  getEmployeeByName,
  addEmployee,
  getEmployees,
  getEmployeesByBadge,
};
