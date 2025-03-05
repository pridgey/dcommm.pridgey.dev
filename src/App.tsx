import type { Component } from "solid-js";
import {
  For,
  createSignal,
  createEffect,
  onMount,
  Show,
  createMemo,
} from "solid-js";
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

  // Memoized list of current movies (movies we're slated to watch)
  const currentMovies = createMemo(() => data.filter((m) => m.current));

  // Utility function for sorting movies
  const sortMovies = (view: "mixed" | "unwatched") => {
    const currentMovies = data.filter((movie) => movie.current);

    if (sortMode() === "mixed") {
      // Current up top, everything else as normal underneath
      const nonCurrentMovies = data.filter((movie) => !movie.current);

      setSortedMovies([...nonCurrentMovies]);
    }

    if (sortMode() === "unwatched") {
      // Current up top, unwatched middle, watched on bottom
      const watchedMovies = data.filter(
        (movie) => movie.watched && !movie.current
      );
      const remainingMovies = data.filter(
        (movie) => !movie.current && !movie.watched
      );

      setSortedMovies([...remainingMovies, ...watchedMovies]);
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
      {/* On Deck - Current Movies */}
      <Show when={!!currentMovies().length}>
        <span class={styles.Title}>Currently On Deck:</span>
        <For each={currentMovies()}>
          {(currentMovie) => (
            <div
              classList={{
                [styles.Item]: true,
                [styles.Current]: true,
                [styles.Watched]: currentMovie.watched,
                [styles.Disqualified]: currentMovie.disqualified,
              }}
              style={{
                "--movie-bg": `url('${currentMovie.image_url}')`,
              }}
            >
              {currentMovie.movie_name}
            </div>
          )}
        </For>
        <hr />
      </Show>
      {/* Catalog with Sort */}
      <span class={styles.Title}>Complete Catalog:</span>
      <div class={styles.Sortbar}>
        <Switch
          OnLabel="Sort Unwatched First"
          OffLabel="Sort Alphabetically"
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
