import { Lightning, Router, Utils } from "@lightningjs/sdk";
import { Grid } from "@lightningjs/ui";
import { getSimilarMovies } from "../lib/api";

export default class Movie extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        src: Utils.asset("images/gradient_background.jpg"),
      },
      MovieTitle: {
        x: 650,
        mountX: 0.5,
        y: 20,
        text: {
          text: this.bindProp("title"),
          fontSize: 50,
          fontStyle: "italic bold",
          shadow: true,
          shadowColor: 0xff314f8b,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
          shadowBlur: 2,
        },
      },
      ReleaseDate: {
        x: 650,
        y: 100,
        mountX: 0.5,
        text: {
          text: this.bindProp("release_date"),
          fontStyle: "italic",
          fontSize: 38,
        },
      },
      Image: {
        x: 650,
        y: 210,
        mountX: 0.5,
        rtt: true,
        rect: true,
        scale: 1.2,
        src: this.bindProp("image"),
      },
      Overview: {
        x: 650,
        y: 750,
        mountX: 0.5,
        w: 1200,
        text: {
          text: this.bindProp("overview"),
          fontSize: 32,
          fontStyle: "italic",
        },
      },
      SimilarMoviesLabel: {
        y: 60,
        x: 1460,
        text: {
          text: "Similar movies",
          fontSize: 35,
          fontStyle: "italic",
        },
      },
      SimilarMovies: {
        x: 1300,
        y: 140,
        type: Grid,
        rows: 3,
        spacing: 20,
      },
      HelpLabel: {
        x: 960,
        y: 1030,
        mountX: 0.5,
        text: {
          text: "[ Press BACK or LEFT to return to the movie list ]",
          fontSize: 20,
        },
      },
    };
  }

  async _active() {
    const data = await getSimilarMovies(this.movie_id);
    const movies = data.results.slice(0, 9).map((movie) => {
      return {
        h: 280,
        w: 180,
        rtt: true,
        rect: true,
        src: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
      };
    });
    this.tag("SimilarMovies").add(movies);
  }

  _inactive() {
    this.tag("SimilarMovies").clear();
  }

  set params(args) {
    this.movie_id = args.movie_id;
    this.title = args.title;
    this.release_date = args.release_date
      ? `Available from ${args.release_date}`
      : "";
    this.image = args.image;
    this.overview = args.overview;
  }

  _handleLeft() {
    Router.navigate("$");
  }

  _handleBack() {
    Router.navigate("$");
  }
}
