import PropTypes from 'prop-types';
import { getContext } from 'recompose';

const contextTypes = {
  t: PropTypes.func
};

const localize = getContext(contextTypes);

export default localize;
