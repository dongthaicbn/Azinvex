import React, { Component } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { vsprintf } from 'sprintf-js';
import { IntlProvider, addLocaleData } from 'react-intl';
import isString from 'lodash/isString';
import isEqual from 'lodash/isEqual';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import includes from 'lodash/includes';
import langs from 'langs';
import cookie from 'js-cookie';
// import ISO from 'iso-3166-2';

import isEmpty from '../helpers/isEmpty';

import {
  LANGUAGE_CODE,
  LANGUAGE_TRANS,
  COUNTRY_CODE
} from '../constants/storages';

import {
  DEFAULT_COUNTRY_CODE,
  DEFAULT_LANGUAGE_CODE,
  SUPPORTED_LANGUAGES,
  RTL_LANGUAGE_CODES
} from '../constants/locale';

import { actionSetLanguageOnMount } from '../../reduxModules/common/systemAction';
import * as countries from '../../../public/locales/countries.json';

const DEFAULT_LANGUAGE_TRANS = 'en';

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
    // if (nextProps.isRTL !== this.props.isRTL) return true; //double renders when this is uncommented
    if (!isEqual(nextState.languageJson, this.state.languageJson)) return true;
    if (nextState.reactIntlLanguageCode !== this.state.reactIntlLanguageCode) return true;
    return false;
  }

  loadLocale = () => {
    let { locale, country } = this.GetLanguage();

    // zh is an exception.
    country = (cookie.get(COUNTRY_CODE)) ? cookie.get(COUNTRY_CODE) : country;
    locale = (cookie.get(LANGUAGE_CODE)) ? cookie.get(LANGUAGE_CODE) : locale;

    const languageTrans = (cookie.get(LANGUAGE_TRANS)) ? cookie.get(LANGUAGE_TRANS)
      : this.supportLanguage(locale, country);

    // country = this.validateCountry(country);
    const languageCode = this.validateLanguage(locale);

    this.updateLanguage({ languageCode, languageTrans }, true);
  }

  updateLanguage = async (props, onMount = false) => {
    let { languageCode } = props;
    languageCode = this.validateLanguage(languageCode);

    // the language trans to be used in reactIntl in "in" should be id
    if (languageCode === 'in') {
      languageCode = 'id';
    }

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

    const isRTLTemp = RTL_LANGUAGE_CODES.indexOf(languageCode) !== -1;
    if (
      onMount && (
        this.props.languageCode !== languageCode ||
      this.props.languageTrans !== props.languageTrans ||
      this.props.isRTL !== isRTLTemp)
    ) {
      this.props.actionSetLanguageOnMount(languageCode, props.languageTrans, isRTLTemp);
    }
    this.setState({ languageJson: json, reactIntlLanguageCode: languageCode });
  }


  GetLanguage = () => {
    let locale = cookie.get(LANGUAGE_CODE);
    let country = cookie.get(COUNTRY_CODE);

    // this to set the default language as callback
    // to get the browser language, either get from headers or navigator. We will be using the `.userLanguage` for IE and `.language` for other browsers.
    if (isEmpty(locale)) {
      // check if userlanguage.
      locale = navigator.userLanguage || navigator.language;

      // Setting locale from browser.
      const aLocaleInfo = locale.split('-');

      const langCode = aLocaleInfo[0];
      locale = langCode;

      if (!country || locale === 'zh') {
        // Only set country if invalid
        let countryCode = aLocaleInfo[0];

        if (aLocaleInfo[1]) {
          const oLocaInfoSecond = aLocaleInfo[1];
          countryCode = oLocaInfoSecond;
        }

        country = countryCode;
      }
    }

    return {
      locale,
      country
    };
  };


  /**
   * Checks if the language is supported and returns the correct form it is not.
   * @param {string} sLanguage
   * @param {string} sCountry
   */
  supportLanguage = (sLanguage, sCountry) => {
    try {
      // First, get the combination of lang_country and add -R
      if (sLanguage.indexOf('zh') >= 0) {
        // Ignore country
        const aZH = sLanguage.replace('_', '-').split('-');
        [sLanguage] = aZH;

        if (aZH[1]) {
          const countryCodeZH = aZH[1];
          sCountry = countryCodeZH;

          if (aZH[1] === 'SG') {
            sCountry = 'CN';
          }
        }
      }

      sCountry = (sCountry) ? `-r${sCountry.toUpperCase()}` : '';
      const sLang = sLanguage.toLowerCase() + sCountry;

      // supported languages are only the languages that are in the UI.
      if (SUPPORTED_LANGUAGES.indexOf(sLang) >= 0) {
        return sLang;
      }
      // try for one more time without -r

      if (!sCountry) {
        // used to prevent infinite loop
        return `${DEFAULT_LANGUAGE_TRANS}`;
      }
      return this.supportLanguage(sLanguage);
    } catch (e) {
      // if invalid, try the sLanguage.
      return this.supportLanguage(sLanguage);
    }
  };


  /**
   * this is to determine whether the return of the language code is correct
   * @param {string} languageCode
   */
  validateLanguage = languageCode => {
    // sanitycheck
    let returnLocale = languageCode;

    if (isString(languageCode) && languageCode.length === 3) {
      // before resorting to default language, we must use first the checker if it exists.
      // sample input is KOR.
      languageCode = languageCode.toLowerCase();
      const oLocaleInfo = langs.where('2', languageCode) || langs.where('2B', languageCode) || langs.where('2T', languageCode) || langs.where('3', languageCode);

      // if oLocaleInfo is still not existing, resort to use the default language.
      returnLocale = DEFAULT_LANGUAGE_CODE;

      if ((oLocaleInfo || !isEmpty(oLocaleInfo)) && oLocaleInfo[1]) {
        const twoLetterCountryCode = oLocaleInfo[1];
        returnLocale = twoLetterCountryCode;
      }

      // TODO : set the new language code cookie based on the new data
    } else if (languageCode.length > 3) {
      // To handle the case of languageCode zh_MO
      // to return the string, only use the first part.
      const firstCountryCode = languageCode.split('_')[0];
      returnLocale = firstCountryCode;
    }

    return returnLocale;
  };

  /**
   * @param {string} sLocale
   */
  validateCountry = sCountryCode => {
    // if it uses iso-3166-1 alpha 3, we need to conver it to alpha 2 (all alpha are 3 letters and alpha 2 are 2 letters)
    if (isString(sCountryCode) && sCountryCode.length === 3) {
      // try {
      //   const oRegionInfo = ISO.subdivision(sCountryCode.toLowerCase);
      //   return oRegionInfo.countryCode.toLowerCase();
      // } catch (e) {
      //   console.warn('Invalid Country');
      //   return DEFAULT_COUNTRY_CODE;
      // }
      return DEFAULT_COUNTRY_CODE;
    }

    // check on the country list
    let isValidCountry = false;
    forEach(countries.list, region => {
      if (includes(map(region.countries, 'code'), sCountryCode.toUpperCase())) {
        isValidCountry = true;
        return false;
      }
    });

    if (!isValidCountry) {
      return DEFAULT_COUNTRY_CODE;
    }

    return sCountryCode;
  };


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
        <Container dir={this.props.isRTL ? 'rtl' : 'ltr'}>{this.props.children}</Container>
      </IntlProvider>
    );
  }
}

export default connect(state => ({
  languageTrans: state.system.languageTrans,
  languageCode: state.system.languageCode,
  isRTL: state.system.isRTL
}), {
  actionSetLanguageOnMount
})(LocaleProvider);
