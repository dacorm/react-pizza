import React from "react";
import qs from 'qs';
import ReactPaginate from "react-paginate";
import axios from "axios";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Paggination from "../components/Paggination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage} from "../redux/slices/filterSlice";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { categoryId, sort, currentPage } = useSelector(state => state.filter);
    const { searchValue } = React.useContext(SearchContext);
    const sortType = sort.sortProperty;
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = number => {
      dispatch(setCurrentPage(number));
    };

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton
        key={index}/>);
    const pizzas = items.filter(obj => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }

        return false;
    }).map(obj => <PizzaBlock key={obj.id} {...obj}/>);
    const order = sortType.includes('-') ? 'asc' : 'desc';

     React.useEffect(() => {
         setIsLoading(true);
         axios.get(`https://628dda79368687f3e70a7839.mockapi.io/items?page=${currentPage}&limit=4&${
                        categoryId > 0 ? `category=${categoryId}` : ''
               }&sortBy=${sortType.replace('-', '')}&order=${order}`).then(res => {
            setItems(res.data);
            setIsLoading(false);
         });
     }, [categoryId, sortType, currentPage])

    React.useEffect(() => {
        const queryString = qs.stringify({
            sortProperty: sort,
            categoryId,
            currentPage,
        });

        navigate(`?${queryString}`)
    }, [categoryId, sort.sortProperty, currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? skeletons : pizzas
                }
            </div>
            <Paggination value={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}

export default Home