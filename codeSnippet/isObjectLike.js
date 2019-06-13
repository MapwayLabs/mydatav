// from lodash
/*
* isObjectLike({})
* // => true
*
* isObjectLike([1, 2, 3])
* // => true
*
* isObjectLike(Function)
* // => false
*
* isObjectLike(null)
* // => false
*/
function isObjectLike(value) {
 return typeof value == 'object' && value !== null
}