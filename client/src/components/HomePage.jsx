import Dashboard from 'components/Dashboard';
import CreateBoard from './CreateBoard';
import Category from './Category';
import SearchBar from './SearchBar';
import { useEffect } from 'react';

const HomePage = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const handleSearchChange = (event) => {
        setSearch(value)
    };

    const handleClearSearch = () => {
        setSearch("")
    };

    const handleCategoryChange = (event) => {
        setCategory(value)
    }

    const handleCreateBoard = () => {
        try{
            await CreateBoard(newBoardData);
            const updatedBoards = await getBoards(search, category);
            setBoards(updatedBoards);
        } catch (error) {
            console.error(error);
        }
    };

    const [boards, setBoards] = useState([]);

    useEffect(() => {
        getBoards(search, category);
        .then((data) => {
            setBoards(data);
})
        .catch(console.error);
    }, [search, category]);

    return (
        <>
            <div className='homePage'>
                <SearchBar
                    onSearchChange={onSearchChange}
                    onClear={handleClearSearch}/>
                <Category onCategoryChange={handleCategoryChange}/>
                <createBoard onCreate={handleCreateBoard}/>
                <Dashboard baords={boards} setBoards={setBoards}/>
            </div>
            <footer>
                Copyright 2025
            </footer>

        </>
    )
export default HomePage;
