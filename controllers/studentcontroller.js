const Student = require("../models/Student"); // iss file ko models se laya jaata hai

async function addStudent(req, res) {
  try {
    // console.log("req.body", req.body);
    let student = new Student(req.body);
    await student.save();
    // res.end("<h1> Data has been inserted successfully..</h1>");
    let students = await Student.find({});
    res.render("studentlist", {
      students: students,
    });

  } catch (err) {
    console.log(err);
  }
}

async function getStudents(req, res) {
  try {
    let students = await Student.find({});
    // res.send(students);
    res.render("studentlist", {
      students: students,
    });
  } catch (err) {
    console.log(err.message);
  }
}

async function getPageForEditStudent(req, res) {
  try {
    let id = req.params.id;
    let student = await Student.findOne({ _id: id });
    // console.log(student);
    // res.send(student);
    res.render("studentforedit", {
      student: student,
    });
  } catch (err) {
    console.log(err);
  }
}

async function editStudent(req, res) {
  try {
    let id = req.params.id; //student edit id
    // console.log(req.body, "req.body");
    let student = await Student.findOne({ _id: id });
    // console.log(student);
    student.rollNo = req.body.rollNo;
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.fatherName = req.body.fatherName;
    student.aadharNo = req.body.aadharNo;
    student.mobileNo = req.body.mobileNo;
    await student.save();
    let students = await Student.find({});
    res.render("studentlist", {
      students: students,
    });

    // res.send("<h1> Student has been updated successfully.....</h1>");
  } catch (err) {
    console.log(err.message, "message");
  }
}

async function deleteStudent(req, res) {
  try {
    let id = req.params.id;
    console.log(id, "id");
    await Student.deleteOne({ _id: id });
    let students = await Student.find({});
    // res.end("<h1> Student has been deleted successfully.....</h1>");
    res.render("studentlist", {
      students: students,
    });
  } catch (err) {
    console.log(err.message);
  }
}
module.exports = {
  addStudent,
  getStudents,
  getPageForEditStudent,
  editStudent,
  deleteStudent,
};
