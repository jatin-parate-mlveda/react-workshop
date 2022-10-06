import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import "./App.css";
import { apiURL, postsApiAxios } from "./constants";

function Content() {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [getPostsLoading, setGetPostsLoading] = useState(true);
  // delete, put, post, get

  useEffect(() => {
    const abortController = new AbortController();
    if (!loading && !isError) {
      setGetPostsLoading(true);
     axios 
        .get('/posts', {
          signal: abortController.signal,
          params: {
            _sort: "id",
            _order: "desc",
          },
          baseURL: apiURL
        })
        .then((res) => {
          setPosts(res.data);
          setGetPostsLoading(false);
        })
        .catch((err) => {
          // AxiosError
          if (err instanceof AxiosError) {
          } else {
          }
          console.log(err);
        });
    }

    return () => {
      abortController.abort();
    };
  }, [isError, loading]);

  /**
   *
   * @type {import('react').FormEventHandler<HTMLFormElement>} e
   */
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const author = formData.get("author");

    setLoading(true);
    setIsError(false);
    try {
      const res = await axios.post("http://localhost:3000/postss", {
        body: { title, author },
      });
      console.log(res.data);
      e.target.reset();
    } catch (err) {
      console.error(err);
      setIsError(true);
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {loading && <h1>Loading...</h1>}
        {isError && <h1>Something went wrong!</h1>}
        <input type="text" name="title" />
        <input type="text" name="author" />
        <button type="submit">create post</button>
      </form>
      {getPostsLoading && <h1>Posts Loading...</h1>}
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>toggle</button>
      {visible && <Content />}
    </div>
  );
}

export default App;
