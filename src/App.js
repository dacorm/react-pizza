import React from 'react';
import './App.css';
import './scss/app.scss';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Header from './components/Header';
import Cart from "./pages/Cart";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock/PizzaBlock";
import Skeleton from "./components/PizzaBlock/Skeleton";
import {
    Routes,
    Route,
} from "react-router-dom";

export const SearchContext = React.createContext('')

function App() {
    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div className="App">
            <div className="wrapper">
                <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                    <Header />
                    <div className="content">
                        <Routes>
                            <Route path="/react-pizza/" element={<Home />}/>
                            <Route path="/" element={<Home />}/>
                            <Route path="/cart" element={<Cart/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </div>
                </SearchContext.Provider>
            </div>
        </div>
);
}

export default App;
