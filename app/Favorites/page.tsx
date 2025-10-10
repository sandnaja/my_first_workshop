import { fetchFavorite } from "@/actions/actions";
import LandmarkList from "@/components/home/LandmarkList";

const FavoritesPage = async () => {
  const favorites = await fetchFavorite();

  return <LandmarkList Landmarks={favorites}/>;
};
export default FavoritesPage;
