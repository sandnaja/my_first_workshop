import { Heart } from 'lucide-react';
import { Button } from '../ui/button';

const FavoriteToggleButton = ({LandmarkID}:{landmarkID:string}) => {
  return (
    <Button size="icon" variant="outline">
        <Heart/>
    </Button>
  )
}
export default FavoriteToggleButton