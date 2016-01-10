# My Webpack Wish List
Critics and other opinions welcome.

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
My wishes:
- Keep it shorter! (Compare with `mkdir`, `mv`, `cp` etc.)
- Show me max 5 most useful options. Hide the rest for something like `webpack -h`. Currently `-h` has no additional effect. 
- Tell me clear and in RED, so I know what the real problem is:
```sh
$ No webpack.config.js found.
```
