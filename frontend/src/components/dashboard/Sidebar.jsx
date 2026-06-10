import "./Sidebar.css";

import {
    useNavigate,
    useLocation
} from "react-router-dom";

function Sidebar() {

    const navigate =
        useNavigate();

    const location =
        useLocation();

    const menuItems = [

        {
            label: "Dashboard",
            path: "/dashboard"
        },

        {
            label: "Upload Resume",
            path: "/upload-resume"
        },

        {
            label: "Resume Library",
            path: "/resume-library"
        },

        {
            label: "Analysis",
            path: "/analysis"
        },

        {
            label: "Analysis History",
            path: "/analysis-history"
        },

        {
            label: "Interview",
            path: "/interview"
        },

        {
            label: "Interview History",
            path: "/interview-history"
        },

        {
            label: "Profile",
            path: "/profile"
        }
    ];

    return (

        <aside className="sidebar">

            

            <ul className="sidebar-menu">

                {
                    menuItems.map(
                        (item) => (

                            <li

                                key={
                                    item.path
                                }

                                className={
                                    location.pathname === item.path
                                        ? "active"
                                        : ""
                                }

                                onClick={() =>
                                    navigate(
                                        item.path
                                    )
                                }
                            >

                                {
                                    item.label
                                }

                            </li>
                        )
                    )
                }

            </ul>

        </aside>
    );
}

export default Sidebar;