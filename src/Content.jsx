import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiURL } from './constants';
import createResource from './createResource';

const postResource = createResource(
  axios.get("/posts", {
    params: {
      _sort: "id",
      _order: "desc",
    },
    baseURL: apiURL,
  })
);
export default function Content() {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("Mounted");

    return () => console.log("Unmounted!");
  }, []);

  console.log("Before promise");
  const posts = postResource.read();
  console.log("After Promise", posts);

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
    setIsError(null);
    try {
      const res = await axios.post("http://localhost:3000/postss", {
        body: { title, author },
      });
      console.log(res.data);
      e.target.reset();
    } catch (err) {
      console.error(err);
      setIsError(err);
    }

    setLoading(false);
  };

  if (isError) {
    throw isError;
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        {loading && <h1>Loading...</h1>}
        {isError && <h1>Something went wrong!</h1>}
        <input type="text" name="title" />
        <input type="text" name="author" />
        <button type="submit">create post</button>
      </form>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}