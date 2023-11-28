const CustomError = require("./customError");
const { Status, SUCCESS, FAIL } = require("../status");

const devErrors = (res, error) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const castErrorHandler = (err) => {
  const msg = `Invalid value for ${err.path}: ${err.value}!`;
  return new CustomError(msg, 400);
};

const duplicateKeyErrorHandler = (err) => {
  const name = err.keyValue.name;
  const msg = `There is already a movie with name ${name}. Please use another name!`;

  return new CustomError(msg, 400);
};

const validationErrorHandler = (err) => {
  const errors = Object.values(err.errors).map((val) => val.message);
  const errorMessages = errors.join(". ");
  const msg = `Invalid input data: ${errorMessages}`;

  return new CustomError(msg, 400);
};

const prodErrors = (res, error) => {
  console.log(error);
  if (error.isOperational) {
    let statusObject = new Status(error.statusCode, FAIL, error.message)
    res.status(error.statusCode).send({message: statusObject.message});
  } else {
    res.status(500).send({message: "Something went wrong! Please try again later."});
  }
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  //TODO: uncomment later
  // if(process.env.NODE_ENV === 'development'){
  //     devErrors(res, error);
  // } else if(process.env.NODE_ENV === 'production'){
  //     if(error.name === 'CastError') error = castErrorHandler(error);
  //     if(error.code === 11000) error = duplicateKeyErrorHandler(error);
  //     if(error.name === 'ValidationError') error = validationErrorHandler(error);

  //     prodErrors(res, error);
  // }

  //TODO: remove the following lines later
  if (error.name === "CastError") error = castErrorHandler(error);
  if (error.code === 11000) error = duplicateKeyErrorHandler(error);
  if (error.name === "ValidationError") error = validationErrorHandler(error);

  prodErrors(res, error);
};