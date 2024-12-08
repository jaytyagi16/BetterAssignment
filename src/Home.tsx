import { NavLink } from "react-router-dom"

function Home(){
  return (
    <div className="mt-56 text-4xl font-bold flex flex-col gap-4">


        Welcome to Better!

        <NavLink className="text-blue-600 text-sm font-normal underline mx-auto" to={"/login"}>Login</NavLink>

    </div>
  )
}

export default Home