"use server";
import { FormState } from "@/utils/types";
import {
  imageSchema,
  landmarkSchema,
  profileSchema,
  validateWithZod,
} from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import { uploadFile } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must login !!!");
  }
  if (!user.privateMetadata.hasProfile) redirect("/profile/create");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "An Error !!",
  };
};

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
        profileImage: user.imageUrl ?? "",
        ...validateField,
      },
    });
    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/");
};

export const createLandmarkAction = async (
  prevState: FormState,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await getAuthUser();
    if (!user) throw new Error("Please Login!!!");
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;

    const validateFile = validateWithZod(imageSchema, { image: file });
    const validateField = validateWithZod(landmarkSchema, rawData);

    const fullPath = await uploadFile(validateFile.image);
    // console.log("fullPath", fullPath);

    await db.landmark.create({
      data: {
        ...validateField,
        profileId: user.id,
        image: fullPath,
      },
    });

    // return { message: " Create Landmark Success !!!" };
  } catch (error) {
    return renderError(error);
  }
  redirect("/");
};

export const fetchLandmarks = async ({search = '' ,category }:{search?:string ,category?:string}) => {
  const landmarks = await db.landmark.findMany({
    where: {
      category,
      OR:[
        { name: {contains: search, mode: 'insensitive' } },
        { description: {contains: search, mode: 'insensitive' } },
      ]
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return landmarks;
};

export const fetchFavoriteId = async ({
  landmarkId,
}: {
  landmarkId: string;
}) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      landmarkId: landmarkId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  favoriteId: string | null;
  landmarkId: string;
  pathname: string;
}) => {
  const { favoriteId, landmarkId, pathname } = prevState;
  const user = await getAuthUser();
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          landmarkId: landmarkId,
          profileId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: favoriteId
        ? "Remove favorite success !!!"
        : "Add favorite success !!!",
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavorite = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      landmark: {
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          price: true,
          province: true,
          lat: true,
          lng: true,
          category: true,
        },
      },
    },
  });
  return favorites.map((favorite)=>favorite.landmark)
};
