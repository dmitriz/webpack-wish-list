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
### My wishes:
- Keep it shorter! Examples to follow: `git`, `npm`.
- Show me max 5 most useful options. Hide the rest into more advanced options. Let me see them with `webpack -h`.
- Tell me clear and in RED, so I know what the real problem is:
```sh
$ No webpack.config.js found.
```

