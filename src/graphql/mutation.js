import { gql } from '@apollo/client';

export const ADD_SONG = gql`
  mutation addSong(
    $title: String!
    $artist: String!
    $url: String!
    $duration: Float!
    $thumbnail: String!
  ) {
    insert_songs(
      objects: {
        artist: $artist
        title: $title
        thumbnail: $thumbnail
        duration: $duration
        url: $url
      }
    ) {
      affected_rows
    }
  }
`;
