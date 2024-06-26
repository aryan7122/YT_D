import axios from "axios";
import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
import "./styles.css";

const YT = () => {
    const [urlValue, setUrlValue] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
       
        // Handle form submission logic here
    };

    const handleDownload = async () => {
        try {
            setLoading(true);
            // const response = await axios.get(`http://localhost:4000/download?url=${urlValue}`);
            const response = await axios.get(`https://ytd-234f.onrender.com/download?url=${urlValue}`);
            setData(response.data);
            setUrlValue("");
            setLoading(false);
            console.log('response', response)
        } catch (error) {
            console.error("Error downloading the video:", error);
            setLoading(false);
        }
    };

    const handleDirectDownload = async (url, filename) => {
        try {
            setLoading(true);

            // saveAs(response.data, filename);
            setLoading(false);
        } catch (error) {
            console.error("Error downloading the file:", error);
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="title">
                    <h1 id="title_img">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFmN-9uF2go01oK0GIF3DSChzsnINH5k5vFQ&s" alt="" /> <span>YouTube</span> Downloader
                    </h1>
                </div>
                <div className="input-group">
                    <input
                        onSubmit={handleSubmit}
                        type="text"
                        placeholder="Enter URL"
                        value={urlValue}
                        onChange={(e) => setUrlValue(e.target.value)}
                    />
                    <button onClick={handleDownload}>Download</button>
                </div>
            </div>

            {loading && (
                <div className="loading-container">
                    <h1>Please Wait Generating Download Link</h1>
                    <br />
                    <img src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif" alt="Loading..." className="loading-gif" />
                </div>
            )}

            <div className="content">
                {data !== null && !loading ? (
                    <div className="result">
                        <div className="video-container">
                            <iframe
                                width="100%"
                                height="auto"
                                src={`${data.url}`}
                                title="video"
                                className="iframe"
                            />
                        </div>
                        <div className="format-list">
                            {data.info.map((format, index) => (
                                <div key={index} className="format-item">
                                    <div id="none_block">
                                        <span className="format-info">
                                            {format.hasVideo ? format.height + "p  " : ""}
                                            ({format.mimeType.split(";")[0] + "  "})
                                        </span>
                                        <span className="size">{`Size: ${(format.contentLength / (1024 * 1024)).toFixed(2)} MB`}</span>
                                        <span className="size">{format.hasAudio ? '🔊' : '🔈'}</span>
                                    </div>
                                    <a
                                        href={format.url}
                                        target="_blank"
                                        rel="noopener noreferrer" // Added rel attribute to fix the warning
                                        download
                                        id="format-link"
                                    >
                                        <button
                                            onClick={() => handleDirectDownload(format.url)}
                                            className="download-button"
                                        >
                                            <FiDownload className="icon" />
                                            Download
                                        </button>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    !loading && <div className="no-download"><img src="https://media.tenor.com/8cViuZ78BC4AAAAi/play-youtube.gif" alt="" id="noData_gif" /></div>
                )}
            </div>
        </div>
    );
};

export default YT;
