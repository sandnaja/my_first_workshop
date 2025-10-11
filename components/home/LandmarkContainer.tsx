import { fetchLandmarks } from "@/actions/actions";
import LandmarkList from "./LandmarkList";
import { LandmarkCardProps } from "@/utils/types";
import Hero from "../hero/Hero";
import CategoriesList from "./CategoriesList";

const LandmarkContainer = async ({
  search,
  category
}: {
  search?: string;
  category?: string;
}) => {
  const landmarks: LandmarkCardProps[] = await fetchLandmarks({ search ,category});
  // console.log(landmarks)

  return (
    <div>
      <Hero Landmarks={landmarks} />
      <CategoriesList search={search} category={category}/>
      <LandmarkList Landmarks={landmarks} />
    </div>
  );
};
export default LandmarkContainer;
