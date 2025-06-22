const Result = require("../models/resultsModel");

exports.handleFetchResult = async (request, response, next) => {
  try {
    const { filters, sorting } = request.query;
    const data = await Result.findAll({
      sorting: sorting,
      filters: filters,
    });
    response.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.handleNewResult = async (request, response, next) => {
  try {
    const { requestId, rtId, extractedText } = request.body;

    if (!requestId || !extractedText || !rtId) {
      return response.status(400).json({ message: "All fields are required." });
    }

    const result = new Result(requestId, rtId, extractedText);
    const data = await result.save();

    response.status(201).json(data);
  } catch (error) {
    console.error("Error creating results:", error);
    next(error);
  }
};
exports.handleFetchResultById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const data = await Result.viewById(id);
    response.status(201).json(data);
  } catch (error) {
    console.log("Error");
    next(error);
  }
};
exports.handleFetchResultFormById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const data = await Result.viewResultFormById(id);
    response.status(201).json(data);
  } catch (error) {
    console.log("Error");
    next(error);
  }
};
exports.handleUpdateResultById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const newData = request.body;
    const data = await Result.updateById(id, newData);
    response.status(201).json(data);
  } catch (error) {
    console.log("Error");
    next(error);
  }
};
exports.handleDeleteResultById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const data = await Result.deleteById(id);
    response.status(201).json(data);
  } catch (error) {
    console.log("Error");
    next(error);
  }
};
