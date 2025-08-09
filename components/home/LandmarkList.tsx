import LandmarkCard from "@/components/card/LandmarkCard";
const LandmarkList = ({Landmarks}) => {
  return (
    <div>
        {
            Landmarks.map((landmark)=>{
                console.log(landmark)
                return <LandmarkCard key={landmark.id} landmark={landmark}/>
            })
        }
    </div>
  )
}
export default LandmarkList