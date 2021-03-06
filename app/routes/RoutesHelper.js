const config = require('../../config');

class RoutesHelper {
  static homeUrl() {
    return '/';
  }

  static mapBasePath() {
    return config.basePath;
  }

  static mapUrl(deck, slide = 0) {
    return `/${this.mapBasePath()}/${this.deckSlugWithSlide(deck, slide)}`;
  }

  static deckSlugWithSlide(deck, slide = 0) {
    return this._deckSlug(deck) + (slide === 0 ? '' : '/' + slide);
  }

  static _deckSlug(deck) {
    return `${deck.id}-${this._deckTitleSlug(deck)}`;
  }

  static _deckTitleSlug(deck) {
    return deck.title.replace(/[^a-z0-9\-_]+/gi, '-').replace(/\-+/, '-').toLowerCase();
  }
}

module.exports = RoutesHelper;