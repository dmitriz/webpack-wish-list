# My Webpack Wish List
Critics and other opinions are always welcome.

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


## Basic config
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

** My wishes: **
- Tell we what you've done! Did you create `bundle.js`? No! Then tell me!
- Don't tell me what might not be immediately helpful. 
