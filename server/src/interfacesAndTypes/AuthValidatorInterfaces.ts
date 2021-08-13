export interface IFieldError {
   field: string;
   message: string;
}

export interface IValidationResult {
   errors: IFieldError[];
   valid: boolean;
}
