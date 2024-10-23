// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import "cypress-drag-drop";
import 'cypress-real-events/support';
// cypress/support/e2e.js

let globalLocalStorageCache = {};  // Глобальний кеш для всіх тестів
let selectiveLocalStorageCache = {};  // Кеш для вибіркових тестів

// Глобальне кешування після кожного тесту
Cypress.on('test:after:run', () => {
    globalLocalStorageCache = { ...localStorage };
});

// Відновлення глобального кешу
Cypress.Commands.add('restoreGlobalLocalStorage', () => {
    Object.keys(globalLocalStorageCache).forEach(key => {
        localStorage.setItem(key, globalLocalStorageCache[key]);
    });
});

// Команда для збереження вибіркового кешу
Cypress.Commands.add('saveSelectiveLocalStorage', () => {
    selectiveLocalStorageCache = { ...localStorage };
});

// Команда для відновлення вибіркового кешу
Cypress.Commands.add('restoreSelectiveLocalStorage', () => {
    Object.keys(selectiveLocalStorageCache).forEach(key => {
        localStorage.setItem(key, selectiveLocalStorageCache[key]);
    });
});



// Alternatively you can use CommonJS syntax:
// require('./commands')
