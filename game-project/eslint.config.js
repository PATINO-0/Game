/**
 * Configura ESLint y las reglas de React; su alcance actual también incluye archivos públicos.
 */
import js from '@eslint/js' // [doc] Importa js desde @eslint/js.
import globals from 'globals' // [doc] Importa globals desde globals.
import reactHooks from 'eslint-plugin-react-hooks' // [doc] Importa reactHooks desde eslint-plugin-react-hooks.
import reactRefresh from 'eslint-plugin-react-refresh' // [doc] Importa reactRefresh desde eslint-plugin-react-refresh.

export default [ // [doc] Exporta el valor principal del módulo.
  { ignores: ['dist'] }, // [doc] Configura ignores con el arreglo de datos.
  {
    files: ['**/*.{js,jsx}'], // [doc] Configura files con el arreglo de datos.
    languageOptions: { // [doc] Configura languageOptions con el objeto de configuración.
      ecmaVersion: 2020, // [doc] Configura ecmaVersion con 2020.
      globals: globals.browser, // [doc] Configura globals con globals.browser.
      parserOptions: { // [doc] Configura parserOptions con el objeto de configuración.
        ecmaVersion: 'latest', // [doc] Configura ecmaVersion con "latest".
        ecmaFeatures: { jsx: true }, // [doc] Configura ecmaFeatures con el objeto de configuración.
        sourceType: 'module', // [doc] Configura sourceType con "module".
      },
    },
    plugins: { // [doc] Configura plugins con el objeto de configuración.
      'react-hooks': reactHooks, // [doc] Configura "react-hooks" con reactHooks.
      'react-refresh': reactRefresh, // [doc] Configura "react-refresh" con reactRefresh.
    },
    rules: { // [doc] Configura rules con el objeto de configuración.
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }], // [doc] Configura "no-unused-vars" con el arreglo de datos.
      'react-refresh/only-export-components': [ // [doc] Configura "react-refresh/only-export-components" con el arreglo de datos.
        'warn',
        { allowConstantExport: true }, // [doc] Configura allowConstantExport con true.
      ],
    },
  },
]
