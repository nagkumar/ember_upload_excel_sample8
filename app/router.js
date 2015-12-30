import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
                                   location: config.locationType
                                 });

Router.map(function ()
           {
             this.resource('books', function ()
             {
               this.route('book');
               this.route('author');
             });
             this.route('books\\publisher');
           });

export default Router;
