
import { EventEmitter }  from 'fbemitter';

/* diria que va a crear una instancia cada vez que importe este archivo desde otro lado */
// export default new EventEmitter();
/* de esta forma siempre exportaré la misma instancia en singleton.¿Es importante esto aquí? */
export const eventEmitter = new EventEmitter();
