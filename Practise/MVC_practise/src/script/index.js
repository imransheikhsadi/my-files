import '../style/sass/main.scss';
// import RootController from './controllers/root.controller';

// new RootController;

import AppController from './MVC/controller';
import Model from './MVC/model';
import View from './MVC/view';
import {select} from './base';

new AppController(new Model,select);



