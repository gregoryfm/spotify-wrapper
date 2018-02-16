/* global fetch */

import { HEADERS, API_URL } from './config';
import { toJSON } from './utils';

export const getAlbum = albumId =>
  fetch(`${API_URL}/albums/${albumId}`, HEADERS).then(toJSON);

export const getAlbums = albumsIds =>
  fetch(`${API_URL}/albums/?ids=${albumsIds}`, HEADERS).then(toJSON);

export const getAlbumTracks = albumId =>
  fetch(`${API_URL}/albums/${albumId}/tracks`, HEADERS).then(toJSON);
