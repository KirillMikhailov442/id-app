export interface FieldError {
  field: string;
  code: string;
  message: string;
}

export interface ExceptionResponse {
  status: number;
  code: string;
  message: string;
  path: string;
  timestamp: string;
  errors?: FieldError[];
}
