import './App.css';
import React,{useEffect,useState} from "react";
import Recipe from './Recipe';
const App = () => {
  const APP_ID = "53e538d3";
  const APP_KEY = "6ab7fdc787a72539a485a8b8ee2cee46"

  const [recipes,setRecipes] = useState([]);
  const [search,setSearch] = useState("");
  const [query,setQuery] = useState('burger');

  useEffect(() => {
    getRecipes();
    console.log("fetching")
  },[query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);

    const data = await response.json();
    setRecipes(data.hits);

  };

  const updateSearch = e =>{
    setSearch(e.target.value);

  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Search
        </button>
        </form>
      <div >
      {recipes.map(recipe =>(
        <Recipe 
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>

  ); 
};

export default App; 
