# this

`this` 是一个关键字，它在不同的上下文中具有不同的值。`this` 的值取决于函数是如何调用的，而不是定义的位置。下面是关于 `this` 的一些详细解释：

## 全局上下文（Global Context）

在全局上下文中，`this` 指向全局对象，通常是 `window` 对象（浏览器环境）。

```javascript
console.log(this) // 在浏览器中，输出 window 对象
```

## 函数上下文（Function Context）

在函数内部，`this` 的值取决于函数是如何被调用的。

### 普通函数

如果函数是作为普通函数调用的，`this` 指向全局对象。

```javascript
function example() {
  console.log(this)
}

example() // 在浏览器中，输出 window 对象
```

### 对象内的方法

如果函数是作为对象的方法调用的，`this` 指向调用该方法的对象。

```javascript
const obj = {
  method: function () {
    console.log(this)
  },
}

obj.method() // 在浏览器中，输出 obj 对象
```

### 箭头函数

在 ES6 中，箭头函数的 `this` 始终指向定义时所在的词法作用域。

```javascript
const arrowFunction = () => {
  console.log(this)
}

arrowFunction() // 箭头函数中的 this 取决于定义时的上下文，可能是全局对象或者其他对象
```

### 构造函数

当一个函数被用作构造函数（使用 `new` 关键字调用）时，`this` 指向新创建的对象实例。

```javascript
function ConstructorExample() {
  this.property = 'value'
}

const instance = new ConstructorExample()
console.log(instance.property) // 输出 'value'
```

### 事件处理程序

在事件处理程序中，`this` 通常指向触发事件的元素。

```javascript
document.getElementById('myButton').addEventListener('click', function () {
  console.log(this) // 在这个上下文中，this 指向触发点击事件的按钮元素
})
```

## 修改 this 指向

主要介绍修改 this 指向的三个方法：call、apply、bind，它们都是函数原型上的方法。

### call

call 会将第一个参数作为函数运行时的 this 并接收不定量的参数来运行该函数。

```js
const people1 = { name: '张三' }
const people2 = { name: '李四' }

function sayHello(age, gender) {
  console.log(this.name, age, gender)
}

sayHello.call(people1, 11, '男') // 张三 11 男
sayHello.call(people2, 22, '女') // 李四 22 女
```

### apply

apply 用法与 call 相同，不同点在于 apply 第二个参数接收一个数组：

```js
const numbers = [5, 6, 2, 3, 7]

const max = Math.max.apply(null, numbers)
console.log(max) // 7
```

### bind

bind 方法创建一个新函数，新函数的 this 指向为第一个参数，并接收不定量的参数。

```js
const o = {
  name: '张三',
  sayHello() {
    console.log(this.name)
  },
}

const fn = o.sayHello.bind({ name: '李四' })
fn() // 李四
```
