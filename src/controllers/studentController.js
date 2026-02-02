const Student = require('../models/Student');

/**
 * CREATE STUDENT (ADMISSION)
 */
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: 'Student creation failed' });
  }
};

/**
 * GET STUDENT PROFILE
 */
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch {
    res.status(500).json({ message: 'Error fetching student' });
  }
};

/**
 * UPDATE STUDENT
 */
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await student.update(req.body);
    res.json(student);
  } catch {
    res.status(400).json({ message: 'Update failed' });
  }
};

/**
 * GET ALL STUDENTS (ADMIN)
 */
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students' });
  }
};

