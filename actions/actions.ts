"use server";
import { FormState } from "@/utils/types";
import { imageSchema, landmarkSchema, profileSchema, validateWithZod } from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import { uploadFile } from "@/utils/supabase";

const getAuthUser = async () => {
  const user = await currentUser()
  if (!user) {
    throw new Error("You must login !!!");
  }
  if(!user.privateMetadata.hasProfile) redirect("/profile/create");
  return user;
}

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
    const user = await currentUser();
    if (!user) throw new Error("Please login !!!");

    const rawData = Object.fromEntries(formData);
    const validateField = validateWithZod(profileSchema, rawData);
    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? '',
        ...validateField
      }
    });
    const client = await clerkClient()
    await client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      }
    })

  } catch (error) {
    return renderError(error);  
  }
  redirect("/");
};

export const createLandmarkAction = async (
  prevState: FormState,
  formData: FormData
): Promise<{message:string}> => {
  try {
    const user = await getAuthUser();
    if (!user) throw new Error("Please Login!!!");
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;

    const validateFile = validateWithZod(imageSchema, {image: file});
    const validateField = validateWithZod(landmarkSchema, rawData);
    
    const fullPath = await uploadFile(validateFile.image);
    console.log("fullPath", fullPath);

  await db.landmark.create({
      data: {
        ...validateField,
        profileId: user.id,
        image: fullPath,
      }
    });

    // return { message: " Create Landmark Success !!!" };
  } catch (error) {
    return renderError(error);  
  }
  redirect("/");
};

export const fetchLandmarks = async()=> {
  const landmarks = await db.landmark.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return landmarks;
}