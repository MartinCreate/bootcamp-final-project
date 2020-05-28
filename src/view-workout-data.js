import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getPrivChatList, privChatMsg, clearChatMessages } from "./actions";

import axios from "./axios";

export default function ViewWoData() {
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState();
    const [woList, setWoList] = useState([]);
    const [woData, setWoData] = useState();
    const [seshData, setSeshData] = useState();
    // const elemRef = useRef(); //for autoscroll
    // const myId = useSelector((state) => state.myId && state.myId);
    // const newLogin = useSelector((state) => state.newLogin && state.newLogin);

    useEffect(() => {
        setMounted(true);
        console.log("View-Workout-Data Component Loaded");

        loadData();
    }, []);

    // const findInd = (arr, prop, val) => {
    //     for (var i = 0; i < arr.length; i++) {
    //         if (arr[i][prop] === val) {
    //             return i;
    //         }
    //     }
    // };

    const loadData = async () => {
        console.log("loadData() is running");

        const { data } = await axios.get("/view-basic-wo-data");
        console.log("data in loadData: ", data);
        setSeshData(data);
    };

    const collapse = (e) => {
        const coll = e.currentTarget;
        coll.classList.toggle("active");
        const content = coll.nextElementSibling;

        const gP = coll.parentNode.parentNode;
        const successMsgs = gP.getElementsByClassName("success-save");
        if (successMsgs) {
            for (let i = 0; i < successMsgs.length; i++) {
                successMsgs[i].remove();
            }
        }

        if (content.style.display === "grid") {
            content.style.display = "none";
        } else {
            content.style.display = "grid";
        }
    };

    // --- Render HTML
    return (
        <div className="component-container">
            <div className="component" id="wo-creator-component">
                <h1>View Workout Data</h1>
                <Link to="/" className="back-home-link">
                    <p>Home</p>
                </Link>

                <div id="view-woData-container">
                    <div className="basic-data-table">
                        <div className="table-header">
                            <div className="vd-nav-date vd-nav">
                                <p>Date</p>
                            </div>
                            <div className="vd-nav-workout vd-nav">
                                <p>Workout</p>
                            </div>
                            <div className="vd-nav-Exercises vd-nav">
                                <p>Exercises</p>
                            </div>
                        </div>
                        <div className="vd-table-content">
                            {/* <div className="vd-table-row">
                                <div className="vd-col1">May 25 2020</div>
                                <div className="vd-col2">Leg Day</div>
                                <div className="vd-col3">
                                    Squats, Lunges, Jump Lunges
                                </div>
                            </div> */}
                            {seshData &&
                                seshData.map((s) => (
                                    <div
                                        className="vd-table-row"
                                        key={s.seshId}
                                    >
                                        <div className="vd-col1">{s.date}</div>
                                        <div className="vd-col2">
                                            {s.woName}
                                        </div>
                                        <div className="vd-col3">
                                            <p>
                                                {s.exers.map((exer) => (
                                                    <span key={exer.exerId}>
                                                        {exer.exerName},{"  "}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>
                                        {/* <div className="vd-col3">
                                            {s.exers.map((exer) => (
                                                <p key={exer}>{exer}</p>
                                            ))}
                                        </div> */}
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="basic-data-table">
                        <div className="table-header">
                            <div className="vd-nav-date vd-nav">
                                <p>Date</p>
                            </div>
                            <div className="vd-nav-workout vd-nav">
                                <p>Workout</p>
                            </div>
                            <div className="vd-nav-Exercises vd-nav">
                                <p>Sets/Exercise</p>
                            </div>
                        </div>
                        <div className="vd-table-content">
                            {seshData &&
                                seshData.map((s) => (
                                    <div
                                        className="vd-table-row vd-rows2"
                                        key={s.seshId}
                                    >
                                        <div className="vd-col1">{s.date}</div>
                                        <div className="vd-col2">
                                            {s.woName}
                                        </div>
                                        {/* <div className="vd-col3">
                                            <p>
                                                {s.exers.map((exer) => (
                                                    <span key={exer.exerId}>
                                                        {exer.exerName}
                                                        <br />
                                                    </span>
                                                ))}
                                            </p>
                                        </div> */}
                                        <div className="vd-col4">
                                            {s.exers.map((ex) => (
                                                <div
                                                    className="vd-exer-sets-div"
                                                    key={ex.exerId}
                                                >
                                                    <div className="vd-exer-name">
                                                        {ex.exerName}
                                                    </div>
                                                    <div className="vd-exer-sets">
                                                        {ex.sets.map((set) => (
                                                            <div
                                                                className="vd-set-div"
                                                                key={set.setnr}
                                                            >
                                                                <span>
                                                                    {set.reps}r
                                                                </span>
                                                                <span>
                                                                    {set.val1}
                                                                    {set.units1}
                                                                </span>
                                                                <span>
                                                                    {set.val2}
                                                                    {set.units2}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
