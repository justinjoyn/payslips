import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.justinjoyn.payslip',
    appName: 'payslips',
    webDir: 'build',
    server: {
        androidScheme: 'https'
    }
};

export default config;
