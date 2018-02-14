/* global fetch */

import API_URL from './config';
import toJSON from './utils';

export const getAlbum = albumId =>
  fetch(`${API_URL}/albums/${albumId}`).then(toJSON);

export const getAlbums = albumsIds =>
  fetch(`${API_URL}/albums/?ids=${albumsIds}`).then(toJSON);

export const getAlbumTracks = albumId =>
  fetch(`${API_URL}/albums/${albumId}/tracks`).then(toJSON);
