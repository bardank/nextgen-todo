enum HTTP_ERRORS {
  INTERNAL_SERVER = "INTERNAL_SERVER",
  UNAUTHORIZED = "UNAUTHORIZED",
  BAD_REQUEST = "BAD_REQUEST",
  NOT_FOUND = "NOT_FOUND",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
}

type HttpErrors = `${HTTP_ERRORS}`;

interface HttpErrorPayloadCommon {
  code: number;
  type: HttpErrors;
  message?: string;
}

interface HttpErrorPayloadBadRequest extends HttpErrorPayloadCommon {
  code: 422;
  type: HTTP_ERRORS.BAD_REQUEST;
  requiredIn: "body" | "query";
}

export type HttpErrorPayload =
  | HttpErrorPayloadCommon
  | HttpErrorPayloadBadRequest;
