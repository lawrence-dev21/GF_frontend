import Mock from './mock';

import './db/users';
import './db/notification';

Mock.onAny().passThrough();
