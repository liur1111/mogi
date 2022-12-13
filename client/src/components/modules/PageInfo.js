import React from "react";
import { Link } from "@reach/router";
import { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "./PageInfo.css";
import "./BigBox.css";
import "./Box.css";
import "../modules/PageOption.css";
import "../../utilities.css";

/**
 *
 * @param userId
 * @param pageId
 * @returns the page info for OpenPage
 */
const PageInfo = (props) => {
  // default text for certain scenarios
  const FAULT_NO_PAGE_BIO = "no page bio exists";
  const BIO_ENTRY_DEFAULT_TEXT = "enter bio here";

  // all states used in PageInfo section
  const [pageObj, setPageObj] = useState(null); // stores the object of the page being displayed
  const [showBioEntry, setShowBioEntry] = useState(false); // true or false for showing text entry box for editing bio
  const [bioValue, setBioValue] = useState(""); // the bio displayed on the page
  const [bioBuffer, setBioBuffer] = useState(""); // stores text as the user is editing the bio
  const [myPage, setMyPage] = useState(false); // true if is user's page, else false
  const [allCreators, setAllCreators] = useState([]);

  // called whenever the user types in the new post input box
  function handleChange(event) {
    setBioBuffer(event.target.value);
  }

  // called when the user hits submit for their bio
  function handleSubmit(event) {
    event.preventDefault();
    setBioValue(bioBuffer); // set the current bio to whatever is in the bioBuffer
    setShowBioEntry(false);
    post("/api/pageBio", { bio: bioBuffer, pageId: props.pageId });
  }

  useEffect(() => {
    let creatorsList = [];
    get("/api/page", { page_id: props.pageId }).then((page) => {
      setPageObj(page);
      setBioValue(page.pageBio);
      setBioBuffer(bioValue);
      if (page.creator_ids.includes(props.userId)) {
        setMyPage(true);
      }
      get("/api/pageCreators", { creator_ids: JSON.stringify(page.creator_ids) }).then(
        (creators) => {
          creatorsList = creators.map((creator) => (
            <Link to={"/profile/" + creator._id}>{creator.username} </Link>
          ));
          setAllCreators(creatorsList);
        }
      );
    });
  }, [props.pageId, props.userId]);

  if (pageObj) {
    // pageObj is undefined during the time that it takes to send a get request to the server and
    //set the userObj state, dont return the page until that happens
    return (
      <div className="PageInfo-container">
        <div className="PageInfo-stats-container">
          <div className="PageInfo-name">{pageObj.name}</div>
          <div className="PageInfo-bio-container">
            {myPage ? (
              /* if showBioEntry is true, then the user sees the text entry */
              showBioEntry ? (
                <>
                  <input
                    className="PageInfo-bio-info"
                    type="text"
                    placeholder={BIO_ENTRY_DEFAULT_TEXT}
                    value={bioBuffer}
                    onChange={handleChange}
                  ></input>

                  <button onClick={handleSubmit}>submit</button>
                </>
              ) : (
                <div className="PageInfo-bio-info">{bioValue ?? FAULT_NO_PAGE_BIO}</div>
              )
            ) : (
              <p className="PageInfo-bio-info">{bioValue ?? FAULT_NO_PAGE_BIO}</p>
            )}
            <Link to={"/members/" + props.pageId} className="PageInfo-membercount">{allCreators.length} members</Link>
          </div>
        </div>
        {myPage ? (
          <div className="PageOption-container">
            <div
              className="PageOption"
              onClick={() => {
                setShowBioEntry(true);
                setBioBuffer(bioValue);
              }}
            >
              edit
            </div>
            <div className="PageOption">
              <Link to={"/adduser/" + props.pageId + "/search"}>add users</Link>
            </div>
            <div className="PageOption">
              <Link className="" to={"/createbox/" + props.pageId + "/select"}>
                <i className="fas fa-plus fa-lg" />
              </Link>
            </div>
          </div>
        ) : pageObj.isGroup ? (
          <>{/* <div className="PageOption">coming soon</div> */}</>
        ) : (
          <></>
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default PageInfo;
