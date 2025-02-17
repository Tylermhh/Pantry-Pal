import './App.css'
import Navbar from "./components/Navbar.jsx";
import PantryGroup from "./components/PantryGroup.jsx";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SearchBar from "./components/SearchBar.jsx";

function App() {
    const categoryList = [
        {id: "group-0", category: "Fridge", numItems: 20, imageURL: "/fridge_image.webp"},
        {id: "group-1", category: "Pantry", numItems: 10, imageURL: "/pantry_image.jpg"},
        {id: "group-2", category: "Freezer", numItems: 5, imageURL: "/freezer_image.jpg"},
        {id: "group-3", category: "Tools", numItems: 7, imageURL: "/tools_image.webp"},
    ]

    const pantryItems = categoryList.map((item) =>
        <PantryGroup
            key={item.id}
            name={item.category}
            numItems={item.numItems}
            imageURL={item.imageURL} />
    )

      return (
        <>
            <body className="flex flex-col border-3 bg-amber-100">
                <div className="flex flex-col justify-center p-2 gap-2">
                    <SearchBar />
                    <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:flex md:flex-wrap gap-6">
                        {pantryItems}
                    </ul>
                    <FontAwesomeIcon icon={faPlus}/>
                </div>
                <Navbar/>
            </body>

        </>
      )
}

export default App
