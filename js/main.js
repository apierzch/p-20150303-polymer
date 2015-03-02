'use strict';
Handlebars.registerHelper('step', function (data) {
    var ret = '';
    for (var key in data) {
        ret = ret + ' data-' + key + '="' + data[key] + '"';
    }
    return ret;
});

var appendSlides = function (data) {

    var steps = data;
    var htmltemplate = $('#step-template').html();
    var htmltempl = Handlebars.compile(htmltemplate);
    var config = steps[0].data;
    steps.forEach(function (step, index) {
        var templ = htmltempl;
        for(var prop in step.data) {
            if(config[prop] && Number.isInteger(config[prop])) {
                config[prop] += step.data[prop];
            } else {
                config[prop] = step.data[prop];
            }
        }
        $.ajax({
            url: '/steps/' + step.uri,
            success: function (data) {
                $('.steps').append(templ({file: data, data: config,
                                          class: step.class, id: step.id}));
            },
            async: false
        });
    });
};

