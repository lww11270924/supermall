import {request} from "./request";

export function getHomrMultidata(){
  return request({
    url:'/home/multidata'
  })
}
