// const CustomError = require("custom-error-instance");
// module.exports.InternalError = CustomError("InternalError", {
//   message: "Internal error"
// });
// module.exports.ValidationError = CustomError("ValidationError", {
//   message: "Wrong input data"
// });
// module.exports.ConflictError = CustomError("ConflictError", {
//   message: "Conflict error"
// });
// module.exports.NotFoundError = CustomError("NotFoundError", {
//   message: "Not found error"
// });
// module.exports.ForbiddenError = CustomError("ForbiddenError", {
//   message: "Forbidden error"
// });
// module.exports.UnauthorizedError = CustomError("UnauthorizedError", {
//   message: "Unauthorized error"
// });
// module.exports.BadRequestError = CustomError("BadRequestError", {
//   message: "Bad request error"
// });

const CustomError = require("custom-error-instance");

module.exports = {
  InternalError: CustomError("InternalError", {
    message: "Internal error"
  }),
  ValidationError: CustomError("ValidationError", {
    message: "Wrong input data"
  }),
  ConflictError: CustomError("ConflictError", {
    message: "Conflict error"
  }),
  NotFoundError: CustomError("NotFoundError", {
    message: "Not found error"
  }),
  ForbiddenError: CustomError("ForbiddenError", {
    message: "Forbidden error"
  }),
  UnauthorizedError: CustomError("UnauthorizedError", {
    message: "Unauthorized error"
  }),
  BadRequestError: CustomError("BadRequestError", {
    message: "Bad request error"
  })
};
