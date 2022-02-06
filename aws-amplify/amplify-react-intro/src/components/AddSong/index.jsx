import { useState } from "react";

import { IconButton, TextField } from "@material-ui/core";
import { Publish } from "@material-ui/icons";
import {v4 as uuid} from "uuid";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { createSong } from "../../graphql/mutations";


const AddSong = ({ onUpload }) => {

  const [ songData, setSongData] = useState({
    title: '',
    owner: '',
    description: '',
  });
  const [ MP3Data, setMP3Data] = useState(null);

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
      like: 0
    }
    console.log('createSongInput', createSongInput);
    await API.graphql(graphqlOperation(createSong, 
      { input: createSongInput }));

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

export default AddSong;