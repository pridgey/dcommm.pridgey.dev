import type { Component } from "solid-js";
import { For, createSignal, createEffect, onMount } from "solid-js";
import { data } from "./data";

import styles from "./App.module.css";
import { Switch } from "./components/Switch";

type MovieData = {
  movie_name: string;
  image_url: string;
  watched: boolean;
  current: boolean;
  disqualified?: boolean;
};

const App: Component = () => {
  const [sortMode, setSortMode] = createSignal<"mixed" | "unwatched">("mixed");
  const [sortedMovies, setSortedMovies] = createSignal<MovieData[]>([]);

  // Utility function for sorting movies
  const sortMovies = (view: "mixed" | "unwatched") => {
    const currentMovies = data.filter((movie) => movie.current);

    if (sortMode() === "mixed") {
      // Current up top, everything else as normal underneath
      const nonCurrentMovies = data.filter((movie) => !movie.current);

      setSortedMovies([...currentMovies, ...nonCurrentMovies]);
    }

    if (sortMode() === "unwatched") {
      // Current up top, unwatched middle, watched on bottom
      const watchedMovies = data.filter(
        (movie) => movie.watched && !movie.current
      );
      const remainingMovies = data.filter(
        (movie) => !movie.current && !movie.watched
      );

      setSortedMovies([...currentMovies, ...remainingMovies, ...watchedMovies]);
    }
  };

  // when sort mode changes, resort movies
  createEffect(() => {
    sortMovies(sortMode());
  });

  // On mount sort movies to the default sort method
  onMount(() => {
    sortMovies(sortMode());
  });

  // render that sweet sweet jsx
  return (
    <main class={styles.App}>
      <img src="/logo.svg" alt="site logo" />
      <div class={styles.Sortbar}>
        <Switch
          Description="Enable to Sort Unwatched -> Watched"
          Label="Sort Unwatched"
          OnChange={(isChecked) => {
            setSortMode(isChecked ? "unwatched" : "mixed");
          }}
        />
        <div class={styles.Stats}>
          <span class={styles.Text}>
            <strong>Watched:</strong>{" "}
            {sortedMovies().filter((m) => m.watched && !m.disqualified).length}
          </span>
          <span class={styles.Text}>
            <strong>Remaining:</strong>{" "}
            {sortedMovies().filter((m) => !m.watched && !m.disqualified).length}{" "}
            (~
            {sortedMovies().filter((m) => !m.watched && !m.disqualified)
              .length / 8}{" "}
            years)
          </span>
        </div>
      </div>
      <For each={sortedMovies()}>
        {(movie) => (
          <div
            classList={{
              [styles.Item]: true,
              [styles.Current]: movie.current,
              [styles.Watched]: movie.watched,
              [styles.Disqualified]: movie.disqualified,
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
