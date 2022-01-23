import { eventEmitter } from "./utils/EventEmitter";

const LinkComponent = () => {

  const createNewLog = () => {
    eventEmitter.emit('NewLog',
    {
      text:'Hi from fbemitter',
    });
  }
  
  return (
  <div>
    <button onClick={createNewLog}>Link Component Click on Me!</button>
  </div>
  );
};

export default LinkComponent;
