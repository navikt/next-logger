export interface LoggerConfiguration {
    basePath?: string;
    apiPath?: string;
}

let config: LoggerConfiguration | null = null;

export const configureLogger = (configuration: LoggerConfiguration) => {
    config = configuration;
};

export const getConfig = (): LoggerConfiguration | null => config;
