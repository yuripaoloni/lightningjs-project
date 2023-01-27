import { Lightning, Router } from "@lightningjs/sdk";

export default class ImageCell extends Lightning.Component {
  static _template() {
    return {
      ImageWrapper: {
        rtt: true,
        rect: true,
        src: this.bindProp("image"),
      },
      Label: {
        x: 0,
        w: 380,
        y: 460,
        text: {
          text: this.bindProp("filmTitle"),
          fontSize: 25,
          fontStyle: "italic bold",
          shadow: true,
          shadowColor: 0xff314f8b,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
          shadowBlur: 2,
        },
      },
    };
  }

  _init() {
    this.filmTitle = "";
    this._focusAnimation = this.animation({
      duration: 0.2,
      actions: [{ p: "scale", v: { 0: 1, 1: 1.3 } }],
    });
  }

  _handleEnter() {
    Router.navigate(`movie/${this.movie_id}`, {
      movie_id: this.movie_id,
      title: this.title,
      release_date: this.release_date,
      overview: this.overview,
      image: this.image,
    });
  }

  _focus() {
    this.filmTitle = this.title;
    if (this._focusAnimation) {
      this._focusAnimation.start();
    }
  }

  _unfocus() {
    this.filmTitle = "";
    this._focusAnimation.stop();
  }
}
