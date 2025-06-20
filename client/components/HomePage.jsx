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

    const handleCreateBoard = async (newBoardData) => {
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
        .then((data) => {
            if (data?.length === 0) {
                const welcomeBoard = [
                    {
                        id:0,
                        title:"Welcome to Kudoboard!",
                        author:"Team Kudoboard",
                        category:"Welcome",
                        cards:[
                            {
                                id: 0,
                                title: "Getting Started",
                                message: "Click on (Create Board) to get started",
                                gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnExeDZ3YmMydHBiYXJhbDM3bDZmNjg4eXgzbzY2ajQ1emF6enM1NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TLnWsIBRegQyWxG4Dw/giphy.gif",
                                author: "Team Kudoboard",


                            },

                        ],
                    },
                ];
                setBoards(welcomeBoard);
            } else{
                setBoards(data);

            }

        })
        .catch(console.error);
    }, [search, category]);


    return (
        <>
            <div className='homePage'>
                <SearchBar
                    onSearchChange={handleSearchChange}
                    onClear={handleClearSearch}/>
                <Category onCategoryChange={handleCategoryChange}/>
                <CreateBoard onCreate={(data) => handleCreateBoard(data)}/>
                <Dashboard boards={boards} setBoards={setBoards}/>
            </div>
            <footer>
                Copyright 2025
            </footer>

        </>
    )}
export default HomePage;
