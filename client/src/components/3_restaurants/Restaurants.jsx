import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import RestaurantCard from './RestaurantCard';
import axios from 'axios';

const Restaurants = (props) => {
  const { clickHandle } = props;
  const [categoryList, setCategoryList] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const restaurantArray = ['Jeju', 'Seoul', 'Busan', 'Daegu'];

  useEffect(() => {
    axios
      .get('/api/v1/categories', {})
      .then((res) => {
        setCategoryList(res.data.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get('/api/v1/restaurants', {})
      .then((res) => {
        console.log(res.data.data)
        setRestaurantList(res.data.data.restaurants);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1> List of Restaurants</h1>
      <ul>
        {restaurantArray.map((element, index) => (
          <Link key={element} to={`/restaurants/${element}`}>
            <li key={element} onClick={() => clickHandle(element)}>
              {element} - index {index}
            </li>
          </Link>
        ))}
      </ul>

      <div className="container">
        <h3 className="text-body">Categories</h3>
        <div className="container-xl d-flex overflow-auto align-baseline">
          {categoryList.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>

      <div className="container">
        <h3 className="text-body">All Restaurants</h3>
        <div className="container-xl restContainer">
          {restaurantList.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
