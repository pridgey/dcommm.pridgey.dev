import type { Component } from "solid-js";
import { For, onMount } from "solid-js";
import { data } from "./data";

import styles from "./App.module.css";

const App: Component = () => {
  let currentMovies = data.filter((movie) => movie.current);
  let watchedMovies = data.filter((movie) => movie.watched && !movie.current);
  let remainingMovies = data.filter(
    (movie) => !movie.current && !movie.watched
  );

  return (
    <main class={styles.App}>
      <For each={[...currentMovies, ...remainingMovies, ...watchedMovies]}>
        {(movie) => (
          <div
            classList={{
              [styles.Item]: true,
              [styles.Current]: movie.current,
              [styles.Watched]: movie.watched,
            }}
            style={{
              "--movie-bg": `url('${movie.image_url}')`,
            }}
          >
            {movie.movie_name}
          </div>
        )}
      </For>
    </main>
  );
};

export default App;
