import React from 'react'
import '../screens_css/Home.css'

const Home = () => {
    return (
        <div className="home">
            <div className="news-feed">
                <div className="card home-card">
                    <h5>ramesh</h5>
                    <div className="card-image">
                        <img src="https://i.pinimg.com/564x/27/24/3d/27243d318562205d299cb1af889c68ad.jpg" alt="load err" />
                    </div>
                    <div>
                        <svg aria-label="Bỏ thích" className="_8-yf5 " fill="#ed4956" height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                        <i className="far fa-heart"></i>
                    </div>
                    <div className="card-content">
                        <h6>title</h6>
                        <p>this is amazing post</p>
                        <input type="text" placeholder="add a comment" />
                    </div>
                </div>

                <div className="card home-card">
                    <h5>ramesh</h5>
                    <div className="card-image">
                        <img src="https://i.pinimg.com/564x/27/24/3d/27243d318562205d299cb1af889c68ad.jpg" alt="load err" />
                    </div>
                    <div>
                        <svg aria-label="Bỏ thích" className="_8-yf5 " fill="#ed4956" height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                        <i className="far fa-heart"></i>
                    </div>
                    <div className="card-content">
                        <h6>title</h6>
                        <p>this is amazing post</p>
                        <input type="text" placeholder="add a comment" />
                    </div>
                </div>
            </div>
            <div className="quang-cao">
                <div className="fixed">
                    aaaaaaaaaaaaaaaaaaaaaaa
                </div>
            </div>
        </div>
    )
}

export default Home