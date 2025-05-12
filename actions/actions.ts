"use server";
import { FormState } from "@/utils/types";
import { profileSchema, validateWithZod } from "@/utils/schemas";

const renderError = (error:unknown):{message:string} => {
    return {
        message: error instanceof Error ? error.message : "An Error !!",
    }
}

export const createProfileAction = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const rawData = Object.fromEntries(formData);
    const validateField = validateWithZod(profileSchema, rawData);
    console.log("Validate", validateField);
    return { message: "Create Profile Success !" };
  } catch (error) {
    console.log(error)
    return renderError(error);  
  }
};
