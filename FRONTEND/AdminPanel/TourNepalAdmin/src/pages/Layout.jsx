import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const Layout = () => {
    return (
        <div className="flex h-screen">
            <Navbar />
            <div className="flex-1 overflow-auto">
                {/* to place the other pages in the outlet */}
                <Outlet /> 
            </div>
        </div>
    )
}

export default Layout