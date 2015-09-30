define([
        'text!templates/Employees/TopBarTemplate.html',
        'custom',
        'common'
    ],
    function (ContentTopBarTemplate, Custom, Common) {
        var TopBarView = Backbone.View.extend({
            el         : '#top-bar',
            contentType: "Employees",
            actionType : null, //Content, Edit, Create
            template   : _.template(ContentTopBarTemplate),

            events: {
                "click a.changeContentView"     : 'changeContentViewType',
                "click ul.changeContentIndex a" : 'changeItemIndex',
                "click #top-bar-deleteBtn"      : "deleteEvent",
                "click #top-bar-discardBtn"     : "discardEvent",
                "click #top-bar-editBtn"        : "editEvent",
                "click #top-bar-createBtn"      : "createEvent",
                "click #top-bar-exportBtn"      : "export",
                "click #top-bar-exportToCsvBtn" : "exportToCsv",
                "click #top-bar-exportToXlsxBtn": "exportToXlsx",
            },

            changeContentViewType: function (e) {
                Custom.changeContentViewType(e, this.contentType, this.collection);
            },

            changeItemIndex: function (e) {
                var actionType = "Content";
                Custom.changeItemIndex(e, actionType, this.contentType, this.collection);
            },

            exportToCsv: function (event) {
                event.preventDefault();
                this.trigger('exportToCsv');
            },

            exportToXlsx: function (event) {
                event.preventDefault();
                this.trigger('exportToXlsx');
            },

            initialize: function (options) {
                this.actionType = options.actionType;
                if (this.actionType !== "Content") {
                    Custom.setCurrentVT("form");
                }
                if (options.collection) {
                    this.collection = options.collection;
                    this.collection.bind('reset', _.bind(this.render, this));
                }
                this.render();
            },

            render     : function () {
                $('title').text(this.contentType);
                var viewType = Custom.getCurrentVT();

                this.$el.html(this.template({viewType: viewType, contentType: this.contentType}));
                Common.displayControlBtnsByActionType(this.actionType, viewType);

                return this;
            },
            editEvent  : function (event) {
                event.preventDefault();
                this.trigger('editEvent');
            },
            createEvent: function (event) {
                event.preventDefault();
                this.trigger('createEvent');
            },
            deleteEvent: function (event) {
                event.preventDefault();
                var answer = confirm("Realy DELETE items ?!");
                if (answer == true) {
                    this.trigger('deleteEvent');
                }
            },

            discardEvent: function (event) {
                event.preventDefault();
                Backbone.history.navigate("home/content-" + this.contentType, {trigger: true});
            }
        });

        return TopBarView;
    });