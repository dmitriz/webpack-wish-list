# My Webpack Wish List
Critics and other opinions are always welcome.

## Dear [Webpack](https://webpack.github.io/),
I know you are very powerful but when people meet you first time, they may feel frustrated.
Here is my wish list, how you could make our experience better and more fun.

## On empty ~~stomach~~ directory
Running
```sh
$ webpack
```
produces a long list of options that never fits in a screen. With somewhat confusing and easy to miss message:
```sh
...
Output filename not configured.
```
**My wishes:**
- Keep it shorter! *Examples to follow:* `git`, `npm`.
- Show me max 5 most useful options. Hide the rest into more advanced options. Let me see them with `webpack -h`.
- Allow smart defaults. Let me start fast with minimum work. Default to `index.js` as `"entry"` and `bundle.js` as `"output"`. This way I don't need any config file to start! *Example to follow: `npm`*. I don't need to declare `package.json`, do I?
- Tell me clear and in RED, what the real problem is:
```sh
$ <in-red> No webpack.config.js found. </in-red>
```


## Dead simple and robust start
- Be smarter and don't be hard on me. Accept more flexible config options:
```js
output: 'bundle'
output: 'bundle.js'
output: {
	file: 'bundle.js'
}
```
Yes, I know, it is `filename` not `file` that I like to see but can't you give me some pleasure to be lazy and enter `file`?
- If you can't understand my config, fail hard and tell me! Don't silently ignore illegal declarations and let me in the dark.


## Basic config - 1st try
Here is my dead simple config for you:
```js
module.exports = {
	output: {
	  	filename: 'bundle.js'
	}
};
```
Your reaction:
```
$ webpack
Hash: 396f0bfb9d565b6f60f0
Version: webpack 1.12.10
Time: 16ms
```

**My wishes:**
- Tell we what you've done! Did you create `bundle.js`? No! Then tell me!
- Don't tell me what might not be immediately helpful. 


## My 1st working config
Ok, so you don't want to accept my `index.js` by default, I'm giving it to you now:
```js
module.exports = {
	entry: 'index.js',
	output: {
	  	filename: 'bundle.js'
	}
};
```
And you:
```sh
ERROR in Entry module not found: Error: Cannot resolve module 'index.js' in .../webpack-wish-list
```
Really? You seem to accept `bundle.js`, why not `index.js`? I know, you really want me to read [your docs](http://webpack.github.io/docs/configuration.html#entry). I wish I could be little bit lazy, but ok, I see that I should have given you:
```sh
module.exports = {
	entry: './index.js',
	output: {
	  	filename: 'bundle.js'
	}
};
```
and --- wow --- I made it, thank you! So here some hubmle wish list that would have saved me time:
- Allow me to refer to `index.js` in current directory without a path.
- Make even simpler config working:
```js
module.exports = {
	entry: './index.js',
	output:  './bundle.js'
};
```
or this:
```js
module.exports = {
	input: './index.js',
	output:  './bundle.js'
};
```
Really, I see `output` and mechanically type `input`! Could you not accept it?


## Trying subdirectories
When I ask you to do:
```js
module.exports = {
	entry: './src/index.js',
	output: {
	  	filename: 'bundle.js'
	},
};
```
you tell me:
```sh
ERROR in Entry module not found: Error: Cannot resolve 'file' or 'directory' ./src/index.js in ...
```
Oh no! You have just found `./index.js`, then why not `./src/index.js`? 


## Giving up and copy-pasting from the Doc
Ok, I know, you really want me to read [your Doc again](http://webpack.github.io/docs/configuration.html#context), so this time I copy-paste exactly as you tell me:
```js
module.export = {
    context: __dirname + "/app",
    entry: "./entry",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    }
}
```
And you ... give me your long list of options with the same familiar message at the end:
```sh
Output filename not configured.
```
No joke? I've just copied it form your Doc! How else you expect me to configure it???


## Google is your friend
Yes, I know, you don't need to tell me! 
So we google "webpack output filename not configured" and get... 
```sh
About 7,600 results!! 
```
Good to know we are not alone! Let's see what we have...

**1st result**
https://github.com/webpack/webpack/issues/1179 --- An issue from Jun 18, 2015!
Issue is closed but last post from 3 days ago still mentions the problem ... not so good :(

**2nd result**
https://github.com/webpack/docs/wiki/configuration --- Your own documentation!
With the same "very simple example" as you name it...

Oh, here is another even simpler example without `context`, let us try it:
```js
module.export = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: './built'
  }
}
```
And you give ... the same result ... really frustrating!

**3rd result**
http://stackoverflow.com/questions/34157313/output-filename-not-configured-error-in-webpack --- StackOverflow!

Oh no! A single very short answer with -1 votes! Doesn't help :(


## Keep looking!
Let me spare the reader from the details of our journey to the following 3 results and move to the 7th --- finally good one:
http://survivejs.com/webpack_react/developing_with_webpack/
Here we have our config --- let us try:
```js
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

module.exports = {
  // Entry accepts a path or an object of entries.
  // The build chapter contains an example of the latter.
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Kanban app'
    })
  ]
};
```
and:
```sh
module.js:339
    throw err;
    ^

Error: Cannot find module 'html-webpack-plugin'
```
At least something new here: the module is missing! So remove it everywhere:
```js
const path = require('path');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

module.exports = {
  // Entry accepts a path or an object of entries.
  // The build chapter contains an example of the latter.
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
};
```
and:
```sh
ERROR in Entry module not found: Error: Cannot resolve 'file' or 'directory' ...
```
Ok, now you talk -- the entry module it is... let's see... the entry is 
```js
PATH.app = path.join(__dirname, 'app')
```
A path! But where is the file? Ah --- the comment:
```js
// Entry accepts a path or an object of entries.
```
Great! So we have the path and it is accepted! 
Still gives errors... but now we have this page... so let's see:
```sh
Directory Structure
...
/app
	index.js
	component.js
```
and finally:
```sh
app/index.js
```
So `index.js` is accepted by default after all! And...
```sh
webpack
Hash: d67dcec5da80aac36c75
Version: webpack 1.12.10
Time: 45ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.42 kB       0  [emitted]  main
   [0] ./app/index.js 33 bytes {0} [built]
```
Magic!


## What can I say?
Forget the Docs and read [this book](http://survivejs.com/webpack_react/), it is awesome and will save you a lot of time.
But could our journey have been easier? I think it could. 

## Final wish list for Mr. Webpack:
- Be more gentle and forgiving, allow more flexibility.
- Use smart default for any configuration entry missing.
- Try your best to figure the correct files.
- Try to be more detailed and expressive in telling us what is wrong.
- Don't silently ignore our entries when you don't like them --- complain hard and to the pont!!!
- Remember the **Rule of Least Surprise** and other principles form [Unix Philosophy](http://www.faqs.org/docs/artu/ch01s06.html).
