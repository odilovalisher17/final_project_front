import React, { useEffect } from "react";
import "./Items.css";
import OneItem from "../OneItem/OneItem";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateItems } from "../../../../Store/Reducers/ItemsReducer";

const Items = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(
          "http://localhost:8080/api/v1/items/getAllItems"
        );

        dispatch(updateItems(data.data.items));
      } catch (error) {
        console.log(error);
      }
    };

    getData();
    const intervalId = setInterval(getData, 4000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  if (items.length > 0) {
    return (
      <div className="items">
        {[...items]
          .sort((a, b) => new Date(b.created_time) - new Date(a.created_time))
          .map((el, index) => (
            <OneItem
              key={index}
              item={{
                id: el._id,
                image: "",
                name: el.name,
                author: {
                  firstName: el.author.firstName,
                  lastName: el.author.lastName,
                },
                collection: el.collection.name,
                properties: el.properties,
                tags: el.tags,
                time: el.created_time,
                likes: el.likes,
                comments: el.comments,
              }}
            />
          ))}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Items;
