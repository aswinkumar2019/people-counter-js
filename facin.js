class App extends React.Component {
  // reference to both the video and canvas
  videoRef = React.createRef();
  canvasRef = React.createRef();

  // we are gonna use inline style
  styles = {
    position: 'fixed',
    top: 150,
    left: 150,
  };


  detectFromVideoFrame = (model, video) => {
    model.estimateFaces(video, returnTensors, flipHorizontal, annotateBoxes).then(predictions => {
      frame_count = frame_count + 1  
      console.log(predictions.length)
      for (let i = 0; i < predictions.length; i++) {
      face_frame_count[frame_count] = predictions.length 
      console.log('predictions',predictions)
      console.log('Top Left',predictions[i].topLeft)
      console.log('Bottom Right',predictions[i].bottomRight)
      center_x[i] = (predictions[i].topLeft[0] + predictions[i].bottomRight[0]) / 2;
      center_y[i] = (predictions[i].topLeft[1] + predictions[i].bottomRight[1]) / 2;
      console.log('Center of face of person ',i+1,'is',center_x,center_y)
      if(frame_count>1) {
       if(face_frame_count[frame_count] == face_frame_count[frame_count-1]) {
          console.log("There are same people in this frame")
          
               }
       else {
           console.log("There is change in person count")
}
}
}
      requestAnimationFrame(() => {
        this.detectFromVideoFrame(model, video);
      });
      /*this.showDetections(predictions);
      var count;
      var classes_distinct;
      console.log('Total number of Objects',predictions.length);
      var classes = []
      for(count=0;count<predictions.length;count++){
        classes[count] = predictions[count].class
       }
       classes_distinct = [...new Set(classes)];
       console.log('count',classes.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {}))
       console.log('Distinct classes',classes_distinct)
       console.log('finish')

      console.log(predictions)
      requestAnimationFrame(() => {
        this.detectFromVideoFrame(model, video);
      });
    }, (error) => {
      console.log("Couldn't start the webcam")
      console.error(error)
    });
  };

  showDetections = predictions => {
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const font = "24px helvetica";
    ctx.font = font;
    ctx.textBaseline = "top";

    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      // Draw the bounding box.
      ctx.strokeStyle = "#2fff00";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, width, height);
      // Draw the label background.
      ctx.fillStyle = "#2fff00";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10);
      // draw top left rectangle
      ctx.fillRect(x, y, textWidth + 10, textHeight + 10);
      // draw bottom left rectangle
      ctx.fillRect(x, y + height - textHeight, textWidth + 15, textHeight + 10);

      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      ctx.fillText(prediction.class, x, y);
      ctx.fillText(prediction.score.toFixed(2), x, y + height - textHeight);
    });
  };*/
 });
  };

  componentDidMount() {
    if (navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia) {
      // define a Promise that'll be used to load the webcam and read its frames
      const webcamPromise = navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then(stream => {
          // pass the current frame to the window.stream
          window.stream = stream;
          // pass the stream to the videoRef
          this.videoRef.current.srcObject = stream;

          return new Promise(resolve => {
            this.videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
        }, (error) => {
          console.log("Couldn't start the webcam")
          console.error(error)
        });

      // define a Promise that'll be used to load the model
      const loadlModelPromise = blazeface.load();
      
      // resolve all the Promises
      Promise.all([loadlModelPromise, webcamPromise])
        .then(values => {
          this.detectFromVideoFrame(values[0], this.videoRef.current);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  // here we are returning the video frame and canvas to draw,
  // so we are in someway drawing our video "on the go"
  render() {
    return (
      <div> 
        <video
          style={this.styles}
          autoPlay
          muted
          ref={this.videoRef}
          width="720"
          height="600"
        />
        <canvas style={this.styles} ref={this.canvasRef} width="720" height="650" />
      </div>
    );
  }
}

const returnTensors = false;
const flipHorizontal = true;
const annotateBoxes = true;
var start;
var end;
var size;
var center_x = [];
var center_y = [];
var id = []
for(let z = 0;z<10000;z++) {
 id[z] = z
}
var frame_count = 0
var face_frame_count = []
face_frame_count[0] = 0
const domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(App), domContainer);
