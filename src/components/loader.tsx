import React from 'react'
import {ClipLoader} from "react-spinners";

import CSS from 'csstype';

const messageStyles: CSS.Properties = {
    marginLeft: '103%', 
    marginTop: '40%'
};

const Loader = ({ loading , message, css, size }: any) => {

    if (size === undefined)
        size = 100;

    return loading ? (
        <div className='overlay-content'>
            <div className='wrapper'>
                <ClipLoader
                        css={css}
                        size={size}
                        color={"#123abc"}
                        loading={loading}
                        
                    />
                <span style={messageStyles}>
                    {'Loading..'}
                </span>
            </div>
        </div>
    ) : null
};

export default Loader;