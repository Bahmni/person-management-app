module.exports = {
    locales: ['en', 'fr'],
    output: 'src/translations/$LOCALE.json',
    input: ['src/**/*.{js,jsx}'], 
    keySeparator: false,
    namespaceSeparator: false, 
    useKeysAsDefaultValue: true,
    verbose: true,
    debug: true
};