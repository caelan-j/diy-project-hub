// JavaScript source code
import { loadLayout } from './load-layout.js';
import { setupProjectRedirectFilters } from './search-router.js';

window.addEventListener('DOMContentLoaded', () => {
    loadLayout();
    setupProjectRedirectFilters();
});