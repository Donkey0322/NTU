/****************************************************************************
  FileName      [ restaurantPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ Implement the restaurant page ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from "react";
import "../css/restaurantPage.css";
import Information from "./information";
import Comment from "./comment";
import { useParams } from "react-router-dom";

import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:4000/api",
});

const RestaurantPage = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [comments, setComments] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  const getInfo = async () => {
    // TODO Part III-2: get a restaurant's info
    console.log(id);
    try {
      const {
        data: { message, contents },
      } = await instance.get("/getInfo", {
        params: { id },
      });
      setInfo(contents);
      console.log(message);
    } catch (error) {
      const errorMessage = "500: Internal Server Error";
      return new Promise((_, reject) => {
        reject(new Error(errorMessage));
      });
    }
  };
  const getComments = async () => {
    console.log(id);
    try {
      const {
        data: { message, contents },
      } = await instance.get("/getCommentsByRestaurantId", {
        params: { restaurantId: id },
      });
      setComments(contents);
      console.log(message);
    } catch (error) {
      const errorMessage = "500: Internal Server Error";
      return new Promise((_, reject) => {
        reject(new Error(errorMessage));
      });
    }
  };
  useEffect(() => {
    if (Object.keys(info).length === 0) {
      getInfo();
      getComments();
    }
  }, []);

  useEffect(() => {
    let rating = 0;
    for (const comment of comments) {
      rating += comment.rating;
    }
    rating /= comments.length;
    console.log(`Rating: ${rating}`);
    setAvgRating(rating);
  }, [comments]);

  return (
    <div className="restaurantPageContainer">
      {Object.keys(info).length === 0 ? (
        <></>
      ) : (
        <Information info={info} rating={avgRating} />
      )}
      <Comment
        restaurantId={id}
        comments={comments}
        setComments={setComments}
      />
    </div>
  );
};
export default RestaurantPage;
