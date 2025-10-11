import { LandmarkCardProps } from "@/utils/types";

const OtherInfo = ({ landmark }: { landmark: LandmarkCardProps }) => {
  return (
    <div className="text-white">
      <p>{landmark.province}</p>
      <p className="text-4xl font-semibold md:my3 md:text-6xl md:leading-[80px]">
        {landmark.name}
      </p>
      <p className="text-lg">
        {" "}
        {(landmark.description ?? "").slice(0, 50)}
        {(landmark.description?.length ?? 0) > 50 && "…"}
      </p>
    </div>
  );
};
export default OtherInfo;
