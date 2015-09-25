define(['jquery', 'abstract/ValidationFormView', 'text!components/projects/templates/CreateNewProjectFormTemplate.html'],
    function($, ValidationFormView, template) {
        return new function() {
            return ValidationFormView.extend({
                events: {
                    "blur form input": "validateField",
                    "click bm-create-project" : "done"
                },

                templateHtml: template,

                onValid: function() {
                    this.model.save();
                }
            });
        };
    });
