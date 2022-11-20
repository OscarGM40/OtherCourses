import _ from 'lodash';

function swatch(color){
  console.log(`Swatch: ${color}`);
  return `Swatch: ${color}`;
}

const memoedSwatch = _.memoize(swatch)

// memoedSwatch("red")
// memoedSwatch("blue")
// memoedSwatch("red")
// memoedSwatch("blue")

const prev = {
  color:null,
  result:null,
}

function rmSwatch(color){
  if(color === prev.color){
    return prev.result
  }
  prev.color=color;
  prev.result = swatch(color);
  return prev.result

}

rmSwatch("red")
rmSwatch("red")
rmSwatch("blue")
rmSwatch("blue")