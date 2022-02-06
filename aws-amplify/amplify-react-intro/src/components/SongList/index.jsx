
import { useEffect, useState } from 'react';
import { API, graphqlOperation, Storage } from 'aws-amplify';

import { IconButton, Paper } from "@material-ui/core"
import { Add, Favorite, Pause, PlayArrow } from "@material-ui/icons";
import ReactPlayer from "react-player";
import { listSongs } from '../../graphql/queries';
import { updateSong } from '../../graphql/mutations';
import AddSong from '../AddSong';


const SongList = ({ loggedIn }) => {

  const [ songs, setSongs] = useState([]);
  const [ songPlaying, setSongPlaying ] = useState('');
  const [ audioURL, setAudioURL ] = useState('');

  const [showAddSong, setShowAddSong] = useState(false);

  const fetchSongs = async () => {
    try {
      /* si uso graphlOperation va a usar Cognito y fallar con los usuarios sin pasar por el SignIN */
      const songData = await API.graphql(graphqlOperation(listSongs, { limit: 10 }));
      
      /* para que use IAM le quito el método anterior y le paso estas opciones */
  /*     const songData = await API.graphql({
    //  si hubiera que mandar data va en la propiedad variables
      // variables: {input: createSongInput
        query: listSongs,
        authMode: 'AWS_IAM'
      }); */
  
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
  
  return(
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
        (showAddSong)
          ? (<AddSong 
               onUpload={() => {
               setShowAddSong(false);
               fetchSongs();
          }} />)
          : (loggedIn) ?          
          (<IconButton onClick={() => setShowAddSong(true)} >
              <Add />
             </IconButton>)
          : <h2>Not logged</h2>
      }
    </div>
  )
}

export default SongList;
