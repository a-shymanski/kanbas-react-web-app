import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1234/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/reactjs.jpg" width={200} />
                        <div>
                            <h5> CS1234 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1234/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/Machine-Learning.jpg" width={200} />
                        <div>
                            <h5> DS4420 Machine Learning </h5>
                            <p className="wd-dashboard-course-title">
                                Data Mining  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1234/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/AI.jpg" width={200} />
                        <div>
                            <h5> CS4100 Artificial Intelligence </h5>
                            <p className="wd-dashboard-course-title">
                                Adapting to the New Age  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1234/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/webdev.jpg" width={200} />
                        <div>
                            <h5> CS4550 Web Development </h5>
                            <p className="wd-dashboard-course-title">
                                Crafting Functioning Websites  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1234/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/combinatorics.jpg" width={200} />
                        <div>
                            <h5> MATH3533 Combinatorics </h5>
                            <p className="wd-dashboard-course-title">
                                Counting Principles  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1234/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/music.jpg" width={200} />
                        <div>
                            <h5> MUSC1001 Music </h5>
                            <p className="wd-dashboard-course-title">
                                Music in Everyday Life  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1234/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/writing.jpg" width={200} />
                        <div>
                            <h5> ENGW3302 English</h5>
                            <p className="wd-dashboard-course-title">
                                Advanced Writing  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1234/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/pep.jpg" width={200} />
                        <div>
                            <h5> MUSC1920 Music </h5>
                            <p className="wd-dashboard-course-title">
                                Pep Band  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
