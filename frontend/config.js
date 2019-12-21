import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

// if PRODUCTION IS TRUE THEN (?) API_PRODUCTION OR API_DEVELOPMENT
export const API = publicRuntimeConfig.PRODUCTION
    ? publicRuntimeConfig.API_PRODUCTION
    : publicRuntimeConfig.API_DEVELOPMENT;
export const APP_NAME = publicRuntimeConfig.APP_NAME;
