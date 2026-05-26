import dotenv from 'dotenv';

dotenv.config();

type EnvironmentName = 'qa' | 'staging' | 'prod';

const environment = (process.env.ENV || 'qa') as EnvironmentName;

const config: Record<EnvironmentName, { baseURL: string }> = {
    qa: { baseURL: process.env.QA_BASE_URL || 'https://www.saucedemo.com' },
    staging: { baseURL: process.env.STAGE_BASE_URL || '' },
    prod: { baseURL: process.env.PROD_BASE_URL || '' }
};

const envConfig = config[environment];

if (!envConfig.baseURL) {
    throw new Error(
        `Missing baseURL for environment "${environment}". ` +
        `Please set ${environment === 'staging' ? 'STAGE_BASE_URL' : 'PROD_BASE_URL'} in your environment or .env file.`
    );
}

export { envConfig };