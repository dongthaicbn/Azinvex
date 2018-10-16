import React, { Component } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { vsprintf } from 'sprintf-js';
import { IntlProvider, addLocaleData } from 'react-intl';
import isEqual from 'lodash/isEqual';

import isEmpty from '../helpers/isEmpty';

import {
  LANGUAGE_CODE,
  LANGUAGE_TRANS
} from '../constants/storages';

import {
  DEFAULT_LANGUAGE_CODE,
  DEFAULT_LANGUAGE_TRANS
} from '../constants/locale';

import { actionSetLanguageOnMount } from '../../reduxModules/common/systemAction';

class LocaleProvider extends Component {
  state = {
    languageJson: {},
    reactIntlLanguageCode: DEFAULT_LANGUAGE_CODE
  }

  static childContextTypes = {
    t: PropTypes.func
  };

  getChildContext = () => ({
    t: this.text
  });

  componentWillMount() {
    this.loadLocale();
  }

  componentWillReceiveProps(nextProps) {
    this.updateLanguage(nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    /**
     * Update component if and only if
     * - isRTL has change
     * - state languageJSON has changed
     * - state reactIntlLanguageCode has changed
     */
    if (!isEqual(nextState.languageJson, this.state.languageJson)) return true;
    if (nextState.reactIntlLanguageCode !== this.state.reactIntlLanguageCode) return true;
    return false;
  }

  loadLocale = () => {
    const languageTrans = DEFAULT_LANGUAGE_TRANS;
    const languageCode = DEFAULT_LANGUAGE_TRANS;

    this.updateLanguage({ languageCode, languageTrans }, true);
  }

  updateLanguage = async (props, onMount = false) => {
    let { languageCode } = props;

    // ReactIntl get language
    try {
      const reactIntlLocal = await import(`react-intl/locale-data/${languageCode}`);
      addLocaleData(reactIntlLocal);
    } catch (e) {
      // if fails convert the language code back to en
      languageCode = DEFAULT_LANGUAGE_CODE;
    }

    let json;

    try {
      json = await import(`../../../public/locales/jsonValues/${props.languageTrans}.json`);
    } catch (e) {
      // if fails import the default text instead (en.json)
      json = await import(`../../../public/locales/jsonValues/${DEFAULT_LANGUAGE_TRANS}.json`);
    }
    if (
      onMount && (
        this.props.languageTrans !== props.languageTrans ||
        this.props.languageCode !== props.languageCode)
    ) {
      this.props.actionSetLanguageOnMount(props.languageCode, props.languageTrans);
    }
    this.setState({ languageJson: json, reactIntlLanguageCode: languageCode });
  }

  // @Override: to pass language
  text = (
    id,
    values,
    defaultText
  ) => {
    const language = this.state.languageJson;
    if (!language[id]) {
      // Show warning for missing DID
      console.warn(`[Translation]: No translation found for string id('${id}'). Using id as fallback.`);
    }

    if (values) {
      return vsprintf(language[id], values) || defaultText || id;
    }
    return language[id] || defaultText || id;
  };

  render() {
    const Container = styled('div')({
      height: '100%'
    });

    if (isEmpty(this.state.languageJson)) {
      return null;
    }

    return (
      <IntlProvider locale={this.state.reactIntlLanguageCode}>
        <Container>{this.props.children}</Container>
      </IntlProvider>
    );
  }
}

function mapStateToProps(state) {
  console.log('state', state);

  return {
    languageTrans: state.system.languageTrans,
    languageCode: state.system.languageCode
  };
}
export default connect(mapStateToProps, { actionSetLanguageOnMount })(LocaleProvider);
