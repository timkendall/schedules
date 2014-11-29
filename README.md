schedules
=========

Schedules is the open source education planner platform for universities and students. It aims to allow students to take control over their education instead of wondering what class they can, should, or need to take. It functions as:

* a schedule builder
* a course catalog
* a major reference

Discuss the project and get help at [discuss.schedulesapp.com](http://discuss.schedulesapp.com/). Head over to our [wiki](https://github.com/timkendall/schedules/wiki) for information on contributing. For more information on the goals and philosophy of this project [visit **schedulesapp.com**](http://schedulesapp.com/)

## Progress
- [x] rehaul UX
- [x] redesign schedule builder
- [ ] reintegrate server data **in progress**
- [ ] finish coding filters  **up next**
- [ ] add user auth with backend
- [ ] add schedule saving / sharing / exporting

## Required tools
* NPM - Node.js package manager; should be installed when you install node.js.
* Bower - Web package manager. Installing [Bower](http://bower.io/) is simple when you have `npm`:

```
$ npm install -g bower
```
* Gulp - Download and Install [Gulp](http://gulpjs.com/).

```
$ npm install -g gulp
```
* SASS - [SASS](http://sass-lang.com) is a CSS extension language used for styling Schedules frontend. You'll need the latest version of the SASS Ruby gem in order to build the stylesheets.

```
$ sudo gem install sass
```


## Getting started
To build and run the app locally run the following commands:

1. Install development dependencies with `npm install`
2. Install app dependencies with `bower install`
3. Run with `gulp watch`

You can then view the app at `http://localhost:9000/`

## Contributing
1. Fork the repo
2. Create a new branch with either a feat/ or fix/ prefix
3. Commit and push changes to your repo
4. Create a new Pull Request

We will accept pulls that:
* Don't break anything
* Are well documented and commented
* Are written in pure JavaScript (sorry no Coffeescript)
* Don't add unnecessary dependencies (no jQuery or Bootstrap please) - make use of Angular.js, Lodash, Concise.css, and Bourbon for the frontend

## Contributors
Timothy Kendall, Ian Jackson, James Steininger, Ross Clare

## License
[The AGPL v3 License](http://www.gnu.org/licenses/agpl-3.0.html)
