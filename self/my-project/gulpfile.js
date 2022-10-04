let preprocessor = 'sass', // Preprocessor (sass, scss, less, styl)
	fileswatch = 'html,htm,txt,json,md,woff,woff2,scss', // List of files extensions for watching & hard reload (comma separated)
	baseDir = 'src', // Base directory path without «/» at the end
	imageswatch = 'jpg,jpeg,png,webp,svg,avif', // List of images extensions for watching & compression (comma separated)
	online = true; // If «false» - Browsersync will work offline without internet connection

let paths = {

	styles: {
		src: baseDir + '/' + preprocessor + '/style.*',
		dest: baseDir + '/css',
	},

	images: {
		src: baseDir + '/original-img/**/*',
		dest: baseDir + '/img',
	},

	scripts: {
		src: baseDir + '/js/*.js',
		dest: baseDir + '/js',
	},

	cssOutputName: 'style.min.css',
	jsOutputName: 'script.min.js',

}

var gulp      	= require('gulp'), // Подключаем Gulp
	sass        = require('gulp-sass')(require('sass')), //Подключаем Sass пакет,
	browserSync = require('browser-sync'); // Подключаем Browser Sync

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('src/sass/**/*.scss') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(gulp.dest('src/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'src' // Директория для сервера - app
		},
		notify: false, // Отключаем уведомления
		online: online
	});
});
	
function startwatch() {
	gulp.watch(baseDir + '/' + preprocessor + '/**/*', {
		usePolling: true
	});
	gulp.watch(baseDir + '/original-img/**/*.{' + imageswatch + '}', {
		usePolling: true
	});
	gulp.watch(baseDir + '/**/*.{' + fileswatch + '}', {
		usePolling: true
	}).on('change', browserSync.reload);
}

gulp.task('default', gulp.parallel(startwatch, 'sass', 'browser-sync'));
