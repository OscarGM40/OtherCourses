import { useEffect, useRef, useState } from "react";
import * as faceapi from 'face-api.js';


const NewPost = ({ image }) => {


  const { url, width, height } = image;
  const [ faces,setFaces ] = useState([]);
  const [friends,setFriends] = useState([]);

  const imgRef = useRef();
  const canvasRef = useRef();

  //como vamos a detectar faces va a tomar tiempo luego asincrona
  const handleImage = async () => {
    const detections = await faceapi.detectAllFaces(
      imgRef.current,
      new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()

    // console.log(detections);
    // la propia libreria ya interactua con la API canvas 
    // 1º hay que crear un Canvas
    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);
    // 2º doy unas dimensiones a ese canvas
    faceapi.matchDimensions(canvasRef.current, {
      width, //  width: imgRef.current.width,
      height //  height: imgRef.current.height 
      });
    const resized = faceapi.resizeResults(detections, {
       width, // width: imgRef.current.width,
       height // height: imgRef.current.height 
      });
    // 3º dibujo las caras detectadas;
    faceapi.draw.drawDetections(canvasRef.current, resized);
    faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);

  };

  const createTags = async () => {
    // detections va a ser un array con todas las caras detectadas(si hay una solo tendrá un elemento)
      const detections = await faceapi.detectAllFaces(
        imgRef.current,
        new faceapi.TinyFaceDetectorOptions())
    // recuerda que canvas necesita (100,100,50,50)
    
    setFaces(detections.map( d => Object.values(d.box)));
  
  }

  const enter = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineWidth =5;
    ctx.strokeStyle = 'red';
    faces.map(face => ctx.strokeRect(...face))
  }
  // console.log(faces);

  const addFriend =  (e) => {
    e.preventDefault();
    setFriends( prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        // para la clase que analiza las caras
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        //dibuja las landmarks en una face
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        //faceRecognition busca rostros famosos 
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        //faceExpressionNet busca expresiones faciales
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ])
        .then(console.log('Models loaded'))
        // .then(handleImage)
        .then(createTags)
        .catch(err => console.log(err));
    }
    // deben cargarse despues de que lo haga imagen,luego
    imgRef.current && loadModels();
  }, [])

  return (
    <div className="newPostContainer">
      <div className="left" style={{width,height}}>
        <img ref={imgRef} crossOrigin="anonymous" src={url} alt="" />
        <canvas 
          onMouseEnter={enter}
          ref={canvasRef} 
          width={width} 
          height={height}
            />
            {faces.map( (face,i) =>(
              <input 
                name={`input${i}`}
                style={{ 
                  position: 'absolute',
                  top: face[1]+face[3]+5,
                  left: face[0] }}
                placeholder="Tag a friend" 
                key={i}
                className="friendInput"
                onChange={addFriend}
              />
            ))}
      </div>
      <div className="right">
        <h1>Share your post</h1>
        <input type="text" placeholder="What's on your mind"
        className="rightInput" />
    
        { friends && (
          <span className="friends">With 
            <span className="name">
            {Object.values(friends)+" "}
            </span>
          </span>
        )}
        <button className="rightButton">Send</button>
      </div>
    </div>
  )
}

export default NewPost
