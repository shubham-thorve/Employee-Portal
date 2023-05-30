import React, { useState } from "react";

import { Link } from "react-router-dom";

import {

    MdOutlineKeyboardArrowDown,

    MdOutlineKeyboardArrowUp,

} from "react-icons/md";

import Tippy from "@tippyjs/react";

const ReadMore = ({ text, maxLength }) => {

    const [isTruncated, setIsTruncated] = useState(true);




    const toggleTruncate = () => {

        setIsTruncated(!isTruncated);

    };




    return (

        <div>

            {isTruncated ? (

                <div>

                    {text.slice(0, maxLength)}

                    <span onClick={toggleTruncate}>

                        ....

                        <br></br>

                        <Tippy content="ReadMore">

                            <Link>

                                <MdOutlineKeyboardArrowDown />

                            </Link>

                        </Tippy>

                    </span>

                </div>

            ) : (

                <div>

                    {text}

                    <span onClick={toggleTruncate}>

                        <Tippy content="ReadLess">

                            <Link>

                                <MdOutlineKeyboardArrowUp />

                            </Link>

                        </Tippy>

                    </span>

                </div>

            )}

        </div>

    );

};




export default ReadMore;