
/* import axios from 'axios'
import { updateStart,updateSuccess,updateError} from "./userSlice";

export const updateUser = async (userInfo,dispatch) => {
  dispatch(updateStart());

  try {
    const response = await axios.post("http://localhost:8800/api/users/1/update",userInfo)
    console.log(response.data)
    dispatch(updateSuccess(response.data));
  } catch (error) {
    dispatch(updateError(error));
  }

} */