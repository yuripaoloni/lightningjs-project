import { Utils, Lightning } from "@lightningjs/sdk";
import { Carousel } from "@lightningjs/ui";
import ImageCell from "../components/ImageCell";
import { getUpcomingMovies } from "../lib/api";

export default class MovieCarousel extends Lightning.Component {
  static _template() {
    return {
      Content: {
        w: 1920,
        h: 1080,
        src: Utils.asset("images/gradient_background.jpg"),
        Header: {
          y: 80,
          x: 900,
          mountX: 0.5,
          text: {
            text: "Upcoming movies in US",
            fontSize: 60,
            fontStyle: "italic bold",
          },
        },
        Carousel: {
          y: 250,
          w: 1920,
          h: 600,
          type: Carousel,
          scroll: 0.5,
          direction: "row",
        },
        HelpLabel: {
          x: 900,
          y: 1000,
          mountX: 0.5,
          text: {
            text: "[ Press ENTER to select a movie ]",
            fontSize: 25,
          },
        },
      },
    };
  }

  async _setup() {
    const data = await getUpcomingMovies();
    const movies = data.results.map((movie) => {
      return {
        margin: 20,
        w: 400,
        h: 300,
        type: ImageCell,
        movie_id: movie.id,
        image: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
        overview: movie.overview,
        title: movie.original_title,
        release_date: movie.release_date,
      };
    });

    this.tag("Carousel").add(movies);
  }

  _getFocused() {
    return this.tag("Carousel");
  }
}
