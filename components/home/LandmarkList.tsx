import LandmarkCard from "@/components/card/LandmarkCard";
import { LandmarkCardProps } from "@/utils/types";
const LandmarkList = ({Landmarks}:{Landmarks:LandmarkCardProps[]}) => {
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
        {
            Landmarks.map((landmark)=>{
                console.log(landmark)
                return <LandmarkCard key={landmark.id} landmark={landmark}/>
            })
        }
    </section>
  )
}
export default LandmarkList