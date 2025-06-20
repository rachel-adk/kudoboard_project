import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import { createBoard, getBoards } from '../api/backend_data';
import Category from './Category';
import SearchBar from './SearchBar';
import CreateBoard from './CreateBoard';


const HomePage = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [boards, setBoards] = useState([]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    };

    const handleClearSearch = () => {
        setSearch("")
    };

    const handleCategoryChange = (category) => {
        setCategory(category)
    }

    const handleCreateBoard = async () => {
        try{
            await createBoard(newBoardData);
            const updatedBoards = await getBoards(search, category);
            setBoards(updatedBoards);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getBoards(search, category)
        .then((data) =>
            setBoards(data))
        .catch(console.error);
    }, [search, category]);

    return (
        <>
            <div className='homePage'>
                <SearchBar
                    onSearchChange={handleSearchChange}
                    onClear={handleClearSearch}/>
                <Category onCategoryChange={handleCategoryChange}/>
                <CreateBoard onCreate={handleCreateBoard}/>
                <Dashboard baords={boards} setBoards={setBoards}/>
            </div>
            <footer>
                Copyright 2025
            </footer>

        </>
    )}
export default HomePage;
