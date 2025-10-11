import { fetchFavorite } from "@/actions/actions";
import EmptyList from "@/components/home/EmptyList";
import LandmarkList from "@/components/home/LandmarkList";

const FavoritesPage = async () => {
  const favorites = await fetchFavorite();
  if(favorites.length === 0){
    return <EmptyList heading="No Items Favorites"/>
  }

  return <LandmarkList Landmarks={favorites}/>;
};
export default FavoritesPage;
