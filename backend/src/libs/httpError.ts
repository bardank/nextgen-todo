import { type HttpErrorPayload } from "../types/error";

export class HttpError extends Error {
  type: string;
  code: number;
  constructor(args: HttpErrorPayload) {
    super(args.message);
    this.message = args.message ?? "";
    this.name = args.type;
    this.type = args.type;
    this.code = args.code;
  }
}
