---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Pair Programming Through Some Closure Problems'
pubDate: 2023-02-06
description: 'In this post, I have some Javascript Code that I have been working on.'
author: 'FOSSBIRD'
image:
  url: 'https://astro.build/assets/blog/astro-1-release-update/cover.jpeg'
  alt: 'The Astro logo with the word One.'
tags: ['programming', 'javascript', 'closures', 'learning']
---


Closures are an important though often not well understood concept in Javascript.  

Closures allow us to take advantage of the storage on a function object in order to make persistent memory for that object.


```javascript
//Write a function once that accepts a callback as input and returns a function. When the returned function is called the first time, it should call the callback and return that output. If it is called any additional times, instead of calling the callback again it will simply return the output value from the first time it was called.

//i: callback, takes one arg
//o: function

// declare function once, has one param, callback(callback)
function once(cb) {
  // declare ran, assigned the valueFlag false
  let flag;
  // declare function inner, it will assign property to cache
  //return function inner{
  function inner(arg) {
    //when this function is called for the first time, we need to invoke callback()
    //store the value of callback() into a variable, callbackValue return the variable
    //set the valueFlag to true
    if (!flag) {
      flag = cb(arg);
    }
    return flag;
  }
  return inner;
}

// isEven takes a number and returns a boolean, returns true if even.
const multiplyBy2 = (num) => num * 2;

//stuff is the evaluated result of once and a number as it's arg
const stuff = once(multiplyBy2);

//console.log(stuff(2)); // 4
//console.log(stuff(3)); // 4

/*
Write a function after that takes the number of times the callback needs to be called before being executed as the first parameter and the callback as the second parameter. 
*/

//i: count - number
//i: func - callback function
//o: function, inner

// CHALLENGE 5
// declare after, takes two params, count and func
function after(count, func) {
  //declare counter, assigned the value of zero initially
  let counter = 0;
  //declare function inner, no params
  function inner() {
    // increment counter
    counter++;
    //console.log(counter);
    // if count === counter
    if (count === counter) {
      //invoke callback func
      func();
    }
    // nothing is returned
  }
  //return inner;
  return inner;
}

// /*** Uncomment these to check your work! ***/
const called = function () {
  console.log('hello');
};
const afterCalled = after(3, called);
// afterCalled(); // => nothing is printed
// afterCalled(); // => nothing is printed
// afterCalled(); // => 'hello' is printed
```
This problem in particular is a difficult one, partly because it's hard to understand what it's asking for initially.  Essentially, what you're tasked with doing is creating find and replace functionality like you would see in Microsoft Word or other word processing software.  

If two strings are passed as arguments, then they will be added to an object with the first string the key and the second the value of that property.  Then, if one string is passed, each key in the object is searched for, and if found, its corresponding value is used to replace the found word.



```javascript
/*
Create a function censor that accepts no arguments. censor will return a function that will accept either two strings, or one string. When two strings are given, the returned function will hold onto the two strings as a pair, for future use. When one string is given, the returned function will return the same string, except all instances of first strings (of saved pairs) will be replaced with their corresponding second strings (of those saved pairs). 
*/

//i: none
//i: one or two strings
//o: editing string

// CHALLENGE 12
function censor() {
  const cache = {};
  // declare cache, assigned the value of an empty object
  let phrase;
  // declare phrase, not assigned anything initially

  // declare inner, takes two parameters, str1 and str1, both strings
  function inner(str1, str2) {
    // if arguments.length is === 2, assign cache[str1] = str2
    if (arguments.length === 2) {
      cache[str1] = str2;
    } else {
      // else if arguments length is === 1,
      // assign phrase the value of str1
      phrase = str1;
      // iterate over cache with a for in loop, use key as the argument
      for (const key in cache) {
        // if phrase includes the key
        // assign phrase the value of phrase.replace(key, cache[key])
        if (phrase.includes(key)) {
          phrase = phrase.replace(key, cache[key]);
        }
      }
      // (still in inner) return phrase
      return phrase;
    }
  }
  // return inner
  return inner;
}

// /*** Uncomment these to check your work! ***/
const changeScene = censor();
changeScene('dogs', 'cats');
changeScene('quick', 'slow');
console.log(
  changeScene('The quick, brown fox jumps over the lazy dogs.')
); // => should log 'The slow, brown fox jumps over the lazy cats.'


```
