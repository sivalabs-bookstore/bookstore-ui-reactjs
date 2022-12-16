
interface EnvConfig {
    CATALOG_API_BASE_URL: string
    ORDER_API_BASE_URL: string
}
declare global {
    interface Window {
        _env_: EnvConfig;
    }
}

const config = { ...window._env_ }

export default config;
