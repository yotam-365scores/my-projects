// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.

(async function run() {
	// in setTimeout, will not stop screen from render
	setTimeout(alert.bind(this, 'in js'), 1);
	

})()
	.catch(error => console.error('in run catch', error))
	.then(() => console.log('in run then'));