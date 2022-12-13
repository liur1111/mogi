import React, { useState, useEffect } from "react";
import {get, post} from "../../utilities";

const Saved = () => {

  // useEffect(()=> {
  //   let boxIds = [];
  //   get("/api/allTextBoxes").then((boxes) => {
  //     console.log(boxes);
  //     boxIds = boxes.map((box) => box._id);
  //     console.log(boxIds);
  //     for (const boxId of boxIds) {
  //       post("/api/changeBox", {boxId:boxId});
  //     }
  //   });
  // }, []);

  return (
    <>
      coming soon...
    </>
  );
};

export default Saved;