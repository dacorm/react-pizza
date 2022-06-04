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


function App() {
    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div className="App">
            <div className="wrapper">
                <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
                <div className="content">
                        <Routes>
                            <Route path="/" element={<Home searchValue={searchValue} />}/>
                            <Route path="/cart" element={<Cart />}/>
                            <Route path="*" element={<NotFound />}/>
                        </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
