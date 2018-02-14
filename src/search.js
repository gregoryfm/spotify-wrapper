/* global fetch */

import API_URL from './config';
import toJSON from './utils';

export const search = (query, type) => {
  const requestInfo = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization : 'Bearer 86debf2641d04c69b04e443d1c0bf4e6'
    }
  };
  return fetch(`${API_URL}/search?q=${query}&type=${type}`, requestInfo)
            .then(toJSON);
}

export const searchArtists = query =>
  search(query, 'artist');

export const searchAlbums = query =>
  search(query, 'album');

export const searchTracks = query =>
  search(query, 'track');

export const searchPlaylists = query =>
  search(query, 'playlist');
