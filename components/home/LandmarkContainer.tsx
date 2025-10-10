import { fetchLandmarks } from "@/actions/actions"
import LandmarkList from "./LandmarkList";
import { LandmarkCardProps } from "@/utils/types";
import Hero from "../hero/Hero";

const LandmarkContainer = async() => {
  const landmarks:LandmarkCardProps[] = await fetchLandmarks();
  // console.log(landmarks)
  
  return (
    <div>
      <Hero Landmarks={landmarks}/>
      <LandmarkList Landmarks={landmarks}/>
    </div>
  )
}
export default LandmarkContainer