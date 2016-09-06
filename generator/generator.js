/**
 * Created by kevin on 16/9/6.
 */
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator();

console.log(hw.next())
console.log(hw.next())
console.log(hw.next())
console.log(hw.next())
