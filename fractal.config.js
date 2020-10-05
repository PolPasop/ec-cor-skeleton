/*
* Require the path module
*/
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

/*
 * Give your project a title.
 */
fractal.set('project.title', 'Ec Cor Styleguide');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'components'));

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
// fractal.web.set('static.path', path.join(__dirname, 'public'));
fractal.web.set('static.path', __dirname + '/public');


/*
 * Build
 */
fractal.web.set('builder.dest', __dirname + '/build');

/*
 * Nunjucks Adapater
 */
fractal.components.engine("@frctl/nunjucks"); // register the Nunjucks adapter for your components
fractal.components.set("ext", ".njk"); // look for files with a .nunj file extension