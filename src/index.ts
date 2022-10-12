import 'dotenv/config';
import '@/env';

import { connect } from '@mongoose';

connect().then(() => {
    import('@client');
});