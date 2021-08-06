`npm install --save-dev eslint-config-prettier eslint-plugin-prettier`

> -  eslint-config-prettier: Turns off all ESLint rules that have the potential to interfere with Prettier rules.
> -  eslint-plugin-prettier: Turns Prettier rules into ESLint rules.

> -A good practice is to lint before commit. Husky is a very popular plugin to achieve so.
>
> -  Next time you commit, husky would exit the git commit when the code does not pass linting.
