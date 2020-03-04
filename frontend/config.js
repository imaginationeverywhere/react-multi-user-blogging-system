import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

// if PRODUCTION IS TRUE THEN (?) API_PRODUCTION OR API_DEVELOPMENT
export const API = publicRuntimeConfig.PRODUCTION
    ? publicRuntimeConfig.API_PRODUCTION
    : publicRuntimeConfig.API_DEVELOPMENT;
export const APP_NAME = publicRuntimeConfig.APP_NAME;
export const DOMAIN = publicRuntimeConfig.PRODUCTION
? publicRuntimeConfig.DOMAIN_PRODUCTION
: publicRuntimeConfig.DOMAIN_DEVELOPMEWNT;

export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID;


