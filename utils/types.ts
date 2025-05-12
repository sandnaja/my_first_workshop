export type FormState = {
  message: string;
};
export type actionFunction = (
  prevState: FormState,
  formData: FormData
) => Promise<{ message: string }>;
