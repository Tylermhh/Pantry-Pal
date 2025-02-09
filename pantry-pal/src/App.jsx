import './App.css'
import Navbar from "./components/Navbar.jsx";
import PantryGroup from "./components/PantryGroup.jsx";

function App() {

  return (
    <>
        <body className="flex flex-col h-screen border-3 bg-amber-100">
            <div className="flex flex-col justify-center p-2 gap-2">
                <input
                    className="flex border rounded-2xl max-w-3xl p-2"
                    type="text" placeholder="Search categories"/>
                <div className="grid gap-6">
                    <PantryGroup name={"Fridge"}/>
                    <PantryGroup name={"Pantry"}/>
                </div>
            </div>
            <Navbar/>
        </body>

    </>
  )
}

export default App
