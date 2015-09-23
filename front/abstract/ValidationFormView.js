define(['../../../bower_components/jquery/dist/jquery.min.js', '../bower_components/backbone/backbone-min', 'underscore', 'syphon'],
    function($, bb, _, syphon) {
        return new function() {
            return bb.View.extend({
                 done: function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.model.setFields(syphon.serialize(this.$el));
                    this.model.validate();
                    if(this.model.get('valid')) {
                        if(this.onValid) this.onValid();
                    }
                    this.render();
                    return false;
                },

                validateField: function(e) {
                    if(e.relatedTarget && e.relatedTarget.nodeName == "BUTTON") {
                        return;
                    }
                    var value = $(e.target).attr('type') == 'checkbox' ? $(e.target).is(':checked') : $(e.target).val();
                    this.model.setField($(e.target).attr('name'), value);
                    this.model.validateField($(e.target).attr('name'));
                    this.render();
                    return true;
                },

                initialize: function () {

                    this.template = _.template(this.templateHtml);
                    this.render();
                },

                addError: function(field, message) {
                    this.model.addError(field, message);
                },

                render: function () {
                    if (this.template && this.$el) $(this.$el).html(this.template({model: this.model}));
                }
            });
        };
    });