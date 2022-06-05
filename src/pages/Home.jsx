import React from "react";
import ReactPaginate from "react-paginate";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Paggination from "../components/Paggination";

const Home = ({ searchValue }) => {
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [categoryId, setCategoryId] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [sortType, setSortType] = React.useState({
        name: 'популярности',
        sortProperty: 'rating',
    });
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton
        key={index}/>);
    const pizzas = items.filter(obj => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }

        return false;
    }).map(obj => <PizzaBlock key={obj.id} {...obj}/>);
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';

    React.useEffect(() => {
        setIsLoading(true);
        fetch(
            `https://628dda79368687f3e70a7839.mockapi.io/items?page=${currentPage}&limit=4&${
                categoryId > 0 ? `category=${categoryId}` : ''
            }&sortBy=${sortType.sortProperty.replace('-', '')}&order=${order}`).then((res) => {
            return res.json();
        }).then((arr) => {
            setItems(arr);
            setIsLoading(false);
        })
    }, [categoryId, sortType, currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)}/>
                <Sort value={sortType} onChangeSort={(i) => setSortType(i)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? skeletons : pizzas
                }
            </div>
            <Paggination onChangePage={number => setCurrentPage(number)}/>
        </div>
    )
}

export default Home