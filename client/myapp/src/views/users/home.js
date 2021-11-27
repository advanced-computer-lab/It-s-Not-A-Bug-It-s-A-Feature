import React from 'react'

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <div className="slider-wrapper">
                <a className="previousButton disabled">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 20 30">
                        <polygon fill="#000" points="20 15 4.228 0 0 3.626 11.954 15 0 26.374 4.228 30" transform="rotate(180 10 15)"></polygon></svg></a>
                        <a className="nextButton disabled"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 20 30">
                            <polygon fill="#000" points="20 15 4.228 0 0 3.626 11.954 15 0 26.374 4.228 30" transform="rotate(0 10 15)"></polygon></svg></a>
                            <div className="track"><div className="slide hidden slider-content" style={{background: 'url(&quot;/react/static/media/slide1.a89b8f05.jpg&quot;) center center no-repeat'}}>
                                <div className="inner"><h1>Vulputate Mollis Ultricies Fermentum Parturient</h1><p></p><button className="site-button">Read More</button></div></div><div className="slide animateOut next slider-content" style={{background: "url(&quot;/react/static/media/slide2.40595120.jpg&quot;) center center no-repeat;"}}>
                                    <div className="inner"><h1>Tortor Dapibus Commodo Aenean Quam</h1><p></p><button className="site-button">Discover</button></div></div>
                                    <div className="slide animateIn next slider-content" style={{background:' url(&quot;/react/static/media/slide3.a89c8d0c.jpg&quot;) center center no-repeat;'}}>
                                        <div className="inner"><h1>Tortor Dapibus Commodo Aenean Quam</h1><p></p><button className="site-button">Discover</button></div></div></div></div>

        </div>
    )
}
