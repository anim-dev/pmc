export function ValidationException(errors: any) {
  const err: any = new Error("Invalid Request");
  err.status = 400;
  err.errors = errors;
  return err;
}