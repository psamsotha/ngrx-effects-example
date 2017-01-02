NgRx Effects Example
====================

Supplementary example project for the article

[Using Effects in an Angular 2 NgRx Application][1]

After clone

    npm install

### Run

    npm run start

### Test

Due to a [bug with `@ngrx/effect`][2] we need to run a post install script. If you're on a unix
system, run `npm run postinstall:unix`. On Windows you need to run `npm run postinstall:win`.
Then to test, run 

    npm run test


[1]: https://psamsotha.github.io/angular/2016/12/31/ngrx-effects-with-angular.html
[2]: https://github.com/ngrx/effects/issues/53


