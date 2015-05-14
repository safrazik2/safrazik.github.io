NProgress.configure({ minimum: 0.1 });
NProgress.configure({ trickleRate: 0.02, trickleSpeed: 200 });
NProgress.configure({ showSpinner: false });

// https://github.com/rails/turbolinks

document.addEventListener('page:fetch',   function() { NProgress.start(); });
document.addEventListener('page:change',  function() { NProgress.done(); });
document.addEventListener('page:restore', function() { NProgress.remove(); });