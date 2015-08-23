/**
 * Created by soundstorm on 21.05.15.
 */
define([
        'text!templates/customerPayments/list/ListTemplate.html',
        'text!templates/customerPayments/forWTrack/ListTemplate.html',
        'helpers'
    ],

    function (PaymentListTemplate, ListTemplateForWTrack, helpers) {
        var PaymentListItemView = Backbone.View.extend({
            el: '#listTable',

            initialize: function(options) {
                this.collection = options.collection;
                this.startNumber = (options.page - 1 ) * options.itemsNumber;//Counting the start index of list items
            },
            render: function() {
                if (App.currentDb === 'weTrack') {
                    this.$el.append(_.template(ListTemplateForWTrack, {
                        paymentCollection: this.collection.toJSON(),
                        startNumber: this.startNumber,
                        currencySplitter: helpers.currencySplitter
                    }));
                } else {
                    this.$el.append(_.template(PaymentListTemplate, {
                        paymentCollection: this.collection.toJSON(),
                        startNumber: this.startNumber,
                        currencySplitter: helpers.currencySplitter
                    }));
                }
            }
        });

        return PaymentListItemView;
    });
