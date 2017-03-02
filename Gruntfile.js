module.exports = function (grunt) {
    grunt.initConfig({
        watch:{
            js : {
                files: ['src/**/*.js'],
                tasks: ['concat']
            }
        },
        uglify: {
            stickyad: {
                options: {
                    sourceMap: true
                },
                files: {
                    "dist/stickyad.min.js": ['src/*.js']
                }
            }
        },
        clean: ['dist']
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean','uglify']);
};