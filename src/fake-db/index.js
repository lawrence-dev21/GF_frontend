import Mock from './mock';

import './db/index';
import './db/notification';

Mock.onAny().passThrough();
