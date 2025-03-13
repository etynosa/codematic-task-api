class ApiResponse {
    constructor(success, statusCode, data, message = null, pagination = null) {
      this.success = success;
      this.statusCode = statusCode;
      this.data = data;
      this.message = message;
      
      if (pagination) {
        this.pagination = pagination;
      }
      
      if (message) {
        this.message = message;
      }
    }
  
    static success(res, data, message = null, statusCode = 200, pagination = null) {
      return res.status(statusCode).json(
        new ApiResponse(true, statusCode, data, message, pagination)
      );
    }
  
    static error(res, message, statusCode = 400, errors = []) {
      return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors
      });
    }
  }
  
  module.exports = ApiResponse;
  