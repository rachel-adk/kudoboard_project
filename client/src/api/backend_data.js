const BASE_URL = 'https://kudoboard-project.onrender.com';
const apiKey = import.meta.env.VITE_API_KEY;

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

// pinning a card
export async function togglePin(cardId) {
    const url = new URL(`${BASE_URL}/cards/${cardId}/pinned`);

    try{
        const response = await fetch (url, {
            method: 'PATCH',
        })
        if (!response.ok){
            throw new Error(`Something went wrong: ${response.status}`);
        }
        const json = await response.json();
        return json;
    } catch(error) {
        console.error(error.message)
        throw error;
    }
}

// deleting a card
export async function deleteCard(cardId) {
    const url = new URL(`${BASE_URL}/cards/${cardId}`);

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

// getting gifs for cards
export async function getGif(searchQuery) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchQuery}&limit=25&offset=0&rating=g&lang=en`;

    try{
        const response = await fetch (url);
        if (!response.ok){
            throw new Error(`Something went wrong: ${response.status}`);
        }
        const json = await response.json();
        return json.data;
    } catch(error) {
        console.error(error.message)
    }
}

//fetching comments for a card
export async function getComments(cardId) {
    console.log('getting comments', cardId);
    const url = `${BASE_URL}/cards/${cardId}/comments`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json;
    }
    catch (error) {
      console.error(error.message);
  }
  }

  //posting a comment for a card
  export async function postComments(data, cardId) {
    console.log("POSTCOMMENTS");
    const url = `${BASE_URL}/cards/${cardId}/comments`;
    console.log(data)
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log({json});
      return json;
    } catch (error) {
      console.error(error.message);
    }
  }
