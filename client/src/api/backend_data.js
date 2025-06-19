const BASE_URL = 'http://localhost:3000';
const apiKey = import.meta.VITE_API_KEY;

// getting the boards
export async function getBoards (search = "", category = "") {
    const url = new URL(`${BASE_URL}/boards`);
    if (search) {
        url.searchParams.append("search", search);
    }
    if (category) {
        url.searchParams.append("category", category);
    }
    try {
        const res = await fetch(url.toString());
        if (!res.ok){
            throw new Error(`Something went wrong: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error(error);
    }
}

// creating a new board
export async function createBoard(data) {
    const url = new URL(`${BASE_URL}/boards`);

    try{
        const response = await fetch (url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (!response.ok){
            throw new Error(`Something went wrong: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
    } catch(error) {
        console.error(error.message)
    }

    }

// deleting a board
export async function deleteBoard(id) {
    const url = new URL(`${BASE_URL}/boards/${id}`);

    try{
        const response = await fetch (url, {
            method: 'DELETE',
        })
        if (!response.ok){
            throw new Error(`Something went wrong: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
    } catch(error) {
        console.error(error.message)
    }
}

// getting the cards
export async function getCards (boardId) {
    const url = new URL(`${BASE_URL}/boards/${boardId}/cards`);
    try {
        const res = await fetch(url.toString());
        if (!res.ok){
            throw new Error(`Something went wrong: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error(error);
    }
}

// creating a new card
export async function createCard(data, boardId) {
    const url = new URL(`${BASE_URL}/boards/${boardId}/cards`);

    try{
        const response = await fetch (url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (!response.ok){
            throw new Error(`Something went wrong: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
    } catch(error) {
        console.error(error.message)
    }

}

// upvoting a card
export async function upvoteCard(cardId) {
    const url = new URL(`${BASE_URL}/cards/${cardId}/upvote`);

    try{
        const response = await fetch (url, {
            method: 'PATCH',
        })
        if (!response.ok){
            throw new Error(`Something went wrong: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
    } catch(error) {
        console.error(error.message)
    }
}

// deleting a card
export async function deleteCard(cardId) {
    const url = new URL(`${BASE_URL}/${cardId}`);

    try{
        const response = await fetch (url, {
            method: 'DELETE',
        })
        if (!response.ok){
            throw new Error(`Something went wrong: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
    } catch(error) {
        console.error(error.message)
    }
}
