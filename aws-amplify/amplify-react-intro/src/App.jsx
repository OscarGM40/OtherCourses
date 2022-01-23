
import awsconfig from './aws-exports';
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';

import { useEffect, useState } from 'react';
import { listSongs } from './graphql/queries';
import { createSong, updateSong } from './graphql/mutations';
import { Paper, IconButton, TextField } from '@material-ui/core';
import { Add, Favorite, Pause, PlayArrow, Publish } from '@material-ui/icons';
import ReactPlayer from 'react-player';
import { v4 as uuid } from 'uuid';
import './App.css';

/* Configuro este proyecto */
Amplify.configure(awsconfig);



const App = () => {

  const [songs, setSongs] = useState([]);
  const [songPlaying, setSongPlaying] = useState('');
  const [audioURL, setAudioURL] = useState('');

  const [showAddSong, setShowAddSong] = useState(false);

  const fetchSongs = async () => {
    try {
      const songData = await API.graphql(graphqlOperation(listSongs, { limit: 10 }));

      /* la data estará en res.data */
      const songList = songData?.data?.listSongs.items;
      console.log('songList', songList);
      setSongs(songList);

    } catch (error) {
      console.log('Error fetching songs', error);
    }
  }

  useEffect(() => {
    fetchSongs();
  }, [])

  const toggleSong = async (index) => {
    if (songPlaying === index) {
      return setSongPlaying('');
    }

    const songFilePath = songs[index].filePath;

    try {
      const fileAccessURL = await Storage.get(songFilePath, {
        download: false, expires: 600
      });
      console.log('fileAccessURL', fileAccessURL);
      setAudioURL(fileAccessURL);
      return setSongPlaying(index);

    } catch (error) {
      console.log('Error accesing the file from s3 Storage', error);
      setSongPlaying('');
      setAudioURL('');
    }
  }

  const addLike = async (index) => {
    try {
      const song = songs[index];
      const updatedSong = { ...song, like: song.like + 1 };

      delete updatedSong.createdAt;
      delete updatedSong.updatedAt;

      const songData = await API.graphql(
        graphqlOperation(updateSong, { input: updatedSong }));
      const songList = [...songs];
      songList[index] = songData.data.updateSong;
      setSongs(songList);

    } catch (error) {
      console.log('Error adding like', error);
    }

  }

  return (
    <div>
      <button>
        <AmplifySignOut />

      </button>
      <h3>Welcome to my App</h3>
      <div className="songList">

        {songs?.map((song, index) => (
          <Paper
            variant="outlined"
            elevation={2}
            key={song.id}>
            <div className="songCard">
              <IconButton
                aria-label="play"
                onClick={() => toggleSong(index)}
              >
                {
                  songPlaying !== index
                    ? (<PlayArrow />)
                    : (<Pause />)
                }
              </IconButton>
              <div>
                <div className="songTitle">{song.title}</div>
                <div className="songOwner">{song.owner}</div>
              </div>
              <div>
                <IconButton
                  aria-label="like"
                  onClick={() => addLike(index)}>
                  <Favorite />
                </IconButton>
                {song.like}
              </div>
              <div className="songDescription">{song.description}
              </div>
            </div>
            {
              songPlaying === index
                ? (
                  <div className="ourAudioPlayer">
                    <ReactPlayer
                      url={audioURL}
                      controls={true}
                      playing={true}
                      height="50px"
                      onPause={() => toggleSong(index)}
                    />
                  </div>
                )
                : null
            }
          </Paper>
        ))}
        {
          showAddSong
            ? (<AddSong onUpload={() => {
              setShowAddSong(false);
              fetchSongs();
            }} />)
            : (<IconButton onClick={() => setShowAddSong(true)} >
              <Add />
            </IconButton>)
        }
      </div>
    </div>
  )
}

export default withAuthenticator(App);

const AddSong = ({ onUpload }) => {

  const [songData, setSongData] = useState({
    title: '',
    owner: '',
    description: '',
  });
  const [MP3Data, setMP3Data] = useState(null);

  const uploadSong = async (event) => {
    event.preventDefault();
    console.log('songData', songData);

    const { key } = await Storage.put(`${uuid()}.mp3`, MP3Data, {
      contentType: 'audio/mpeg'
    });

    const createSongInput = {
      id: uuid(),
      ...songData,
      filePath: key,
      like:0
    }
    console.log('createSongInput', createSongInput);
    await API.graphql(graphqlOperation(createSong, { input: createSongInput }));

    onUpload();
  }

  return (

    <div className="newSong" style={{ width: "100%" }}>
      <h3>Add a new song</h3>
      <TextField label="Title"
        value={songData.title}
        onChange={(event) => setSongData({ ...songData, title: event.target.value })}
      />
      <TextField label="Artist"
        value={songData.owner}
        onChange={(event) => setSongData({ ...songData, owner: event.target.value })}
      />
      <TextField label="Description"
        value={songData.description}
        onChange={(event) => setSongData({ ...songData, description: event.target.value })}
      />
      <input
        type="file"
        onChange={(event) => setMP3Data(event.target.files[0])}
      />
      <IconButton onClick={uploadSong}>
        <Publish />
      </IconButton>
    </div>

  );
}