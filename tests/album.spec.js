import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe('Album', () => {

  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke tests', () => {
    it('should exist the getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should exist the getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });

    it('should exist the getAlbums method', () => {
      expect(getAlbums).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch function', () => {
      const album = getAlbum('0sNOF9WDwhWunNAHPD3Baj');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = getAlbum('0sNOF9WDwhWunNAHPD3Baj');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj');

      const album2 = getAlbum('0sNOF9WDwhWunNAHPD3Bag');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Bag');
    });

    it('should return the JSON Data from the Promise', () => {
      promise.resolves({ album: 'Escama só de Peixe' });
      const album = getAlbum('0sNOF9WDwhWunNAHPD3Baj');
      expect(album.resolveValue).to.be.eql({ album: 'Escama só de Peixe' });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch function', () => {
      const albums = getAlbums(['0sNOF9WDwhWunNAHPD3Baj', '0sNOF9WDwhWunNAHPD3Bag']);
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = getAlbums(['0sNOF9WDwhWunNAHPD3Baj', '0sNOF9WDwhWunNAHPD3Bag']);
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/?ids=0sNOF9WDwhWunNAHPD3Baj,0sNOF9WDwhWunNAHPD3Bag');

      const albums2 = getAlbums(['2BTZIqw0ntH9MvilQ3ewNY', '0sNOF9WDwhWunNAHPD3Bay']);
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/?ids=0sNOF9WDwhWunNAHPD3Baj,0sNOF9WDwhWunNAHPD3Bag');
    });

    it('should return the JSON Data from the Promise', () => {
      promise.resolves({ album: 'nome' });
      const album = getAlbums(['2BTZIqw0ntH9MvilQ3ewNY', '0sNOF9WDwhWunNAHPD3Bay']);
      expect(album.resolveValue).to.be.eql({ album: 'nome' });
    });
  });

  describe('getAlbumTracks', () => {
    it('should call fetch function', () => {
      const albumTracks = getAlbumTracks('0sNOF9WDwhWunNAHPD3Bag');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albumTracks = getAlbumTracks('0sNOF9WDwhWunNAHPD3Bag');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Bag/tracks');
    });

    it('should return the JSON Data from the Promise', () => {
      promise.resolves({ album: 'nome' });
      const album = getAlbumTracks('0sNOF9WDwhWunNAHPD3Baj');
      expect(album.resolveValue).to.be.eql({ album: 'nome' });
    });
  });
});
