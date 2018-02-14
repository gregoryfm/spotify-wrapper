import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/search';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => { 
    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {
    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      context('Passing one type', () => {
        const artists = search('IZA', 'artist');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=IZA&type=artist');

        const albums = search('IZA', 'album');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=IZA&type=album');
      });

      context('Passing more than one type', () => {
        const artistsAndAlbums = search('IZA', ['artist', 'album']);
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=IZA&type=artist,album');
      });
    });

    it('should return the JSON Data from the Promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('IZA', 'artist');

      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Foo Fighters');
      expect(fetchedStub).have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = searchArtists('IZA');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=IZA&type=artist');
    });
  });

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('Concrete and Gold');
      expect(fetchedStub).have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = searchAlbums('IZA');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=IZA&type=album');
    });
  });

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks('Everlong');
      expect(fetchedStub).have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = searchTracks('IZA');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=IZA&type=track');
    });
  });

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      const playlists = searchPlaylists('This is: Foo Fighters');
      expect(fetchedStub).have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = searchPlaylists('IZA');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=IZA&type=playlist');
    });
  });
});
