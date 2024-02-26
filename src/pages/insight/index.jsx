import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { RiSparklingFill } from "react-icons/ri";

function InsightPage() {
    const { state } = useLocation();
    const { data } = state;

    const navigate = useNavigate();

    return (
        <div className='insight__page'>
            <div className="container">
                <RiSparklingFill size={40} />
                <h1>AI Generated Insight</h1>
                <p dangerouslySetInnerHTML={{ __html: data }}></p>

                <div className='flex mt-4'>
                    <button className="btn btn_outline" onClick={() => navigate('/')}>
                        Back to Home
                    </button>
                    <button className="btn btn_primary" onClick={() => navigate('/')}>
                        Download full insight
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InsightPage