export interface Signup {
  status: number;
  errors: { generic: string } | null;
  success: { message: string } | null;
}

export interface Login {
  status: number;
  errors: { generic: string } | null;
  success: { accessToken: string } | null;
}
