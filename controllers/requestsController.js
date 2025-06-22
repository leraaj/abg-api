const MedicalTest = require("../models/requestsModel");

exports.handleFetchMedicalTest = async (request, response, next) => {
  try {
    const { filters, sorting } = request.query;
    const data = await MedicalTest.findAll({
      sorting: sorting,
      filters: filters,
    });
    response.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.handleNewMedicalTest = async (request, response, next) => {
  try {
    const {
      patientName,
      age,
      sex,
      diagnosis,
      requestor,
      physician,
      fio2Route,
    } = request.body;
    const inputs = new MedicalTest(
      patientName,
      age,
      sex,
      diagnosis,
      requestor,
      physician,
      fio2Route
    );
    console.log({
      patient: patientName,
      age: age,
      sex: sex,
      diagnosis: diagnosis,
      requestor: requestor,
      physician: physician,
      fio2Route: fio2Route,
    });

    if (
      !patientName ||
      !age ||
      !sex ||
      !diagnosis ||
      !physician ||
      !requestor ||
      !fio2Route
    ) {
      return response.status(400).json({ message: "All fields are required." });
    }

    const data = await inputs.save();

    response.status(201).json(data);
  } catch (error) {
    console.error("Error creating user:", error);
    next(error);
  }
};
exports.handleFetchMedicalTestById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const data = await MedicalTest.viewById(id);
    response.status(201).json(data);
  } catch (error) {
    console.log("Error");
    next(error);
  }
};
exports.handleUpdateMedicalTestById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const incomingwData = request.body;
    const newData = {
      patientName: incomingwData.patient_name,
      sex: incomingwData.sex,
      diagnosis: incomingwData.diagnosis,
      age: incomingwData.age,
      physician: incomingwData.physician_id,
      fio2Route: incomingwData.fio2_route,
    };
    const data = await MedicalTest.updateById(id, newData);
    response.status(201).json(data);
  } catch (error) {
    console.log("Error");
    next(error);
  }
};
exports.handleDeleteMedicalTestById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const data = await Request.deleteById(id);
    response.status(201).json(data);
  } catch (error) {
    console.log("Error");
    next(error);
  }
};
