// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ comment.js ]
// * PackageName  [ server ]
// * Synopsis     [ Apis of comment ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Comment from "../models/comment";

exports.GetCommentsByRestaurantId = async (req, res) => {
  /*******    NOTE: DO NOT MODIFY   *******/
  const restaurantId = req.query.restaurantId;
  try {
    const comment = await Comment.find({ restaurantId });
    console.log(comment);
    res.json({
      message: "success",
      contents: comment,
    });
  } catch {
    res.json({
      message: "error",
      contents: [],
    });
  }
  /****************************************/
  // TODO Part III-3-a: find all comments to a restaurant

  // NOTE USE THE FOLLOWING FORMAT. Send type should be
  // if success:
  // {
  //    message: 'success'
  //    contents: the data to be sent
  // }
  // else:
  // {
  //    message: 'error'
  //    contents: []
  // }
};

exports.CreateComment = async (req, res) => {
  /*******    NOTE: DO NOT MODIFY   *******/
  const body = req.body;
  const { restaurantId, name, content, rating } = body;
  /****************************************/
  console.log(body);
  try {
    const newUser = new Comment({ restaurantId, name, content, rating });
    await newUser.save();
    console.log("Created comment");
    res.json({
      message: "created",
      contents: newUser,
    });
  } catch (e) {
    console.log("Comment creation error");
    throw new Error("Comment creation error: " + e);
  }
  // TODO Part III-3-b: create a new comment to a restaurant
};
