import Navbar from "../components/Navbar.js";

function Profile() {
    return (
        <>
            <div className="flex flex-col bgPrimary textInverse min-h-screen">
                <div className="flex flex-col w-full gap-4 items-center justify-center min-h-96 ">
                    <img
                        src={"/default_cow.jpg"}
                        alt={"profile picture"}
                        className="rounded-full w-28 h-full object-cover border-2"
                    />
                    <ul className="flex flex-col gap-3 text-center">
                        <li>
                            <p className="font-bold text-xl leading-tight">Name</p>
                            <p className="text-xl leading-tight">Min Hset Hlaing</p>
                        </li>
                        <li>
                            <p className="font-bold text-xl leading-tight">Email</p>
                            <p className=" text-xl leading-tight">hlaing@calpoly.edu</p>
                        </li>
                    </ul>


                    <button className="bgSecondary text-white px-3 py-1 mt-2 rounded-md cursor-pointer">
                        Sign Out
                    </button>
                </div>
            </div>
        </>
    )
}

export default Profile;