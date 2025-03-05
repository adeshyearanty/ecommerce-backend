export class ErrorCodes extends Error {
  constructor(message, errorCode, type) {
    super(message);
    this.errorCode = errorCode;
    this.type = type;
  }
}

export class BadRequestException {
  constructor(msg) {
    return new ErrorCodes(msg, 400, "BadRequestException");
  }
}

export class InternalServerException {
  constructor(msg = "Opps! Something went wrong") {
    return new ErrorCodes(msg, 500, "InternalServerException");
  }
}

export class NotFoundException {
  constructor(msg) {
    return new ErrorCodes(msg, 404, "NotFoundException");
  }
}

export class UnauthorizedException {
  constructor(msg) {
    return new ErrorCodes(msg, 401, "UnauthorizedException");
  }
}
