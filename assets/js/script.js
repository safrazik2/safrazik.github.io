NProgress.configure({ minimum: 0.1 });
NProgress.configure({ trickleRate: 0.02, trickleSpeed: 200 });
NProgress.configure({ showSpinner: false });

var disqusEmbedScriptLoaded = false;
var disqusLatest = null;
var disqusLoaded = false;
/* * * Disqus Reset Function * * */
var resetDisqus = function () {
	if(!disqusLatest){
		return;
	}
    DISQUS.reset({
        reload: true,
        config: function () {
            this.page.identifier = disqusLatest.identifier;
            this.page.url = disqusLatest.url;
            this.page.title = disqusLatest.title;
            this.language = disqusLatest.language;
        }
    });
};

var updateDisqus = function(newIdentifier, newUrl, newTitle, newLanguage){
	disqusLatest = {
		identifier: newIdentifier,
		url: newUrl,
		title: newTitle,
		language: newLanguage,
	};
}

var loadDisqusEmbedScript = function() {
	if(!disqus_enabled || disqusEmbedScriptLoaded){
		return;
	}
	disqusEmbedScriptLoaded = true;
    var dsq = document.createElement('script');
    dsq.type = 'text/javascript';
    dsq.async = true;
    dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
};

var resetCount = function() {
	if(!disqus_enabled){
		return;
	}
	window.DISQUSWIDGETS = undefined;
    var s = document.createElement('script'); s.async = true;
    s.type = 'text/javascript';
    s.src = '//' + disqus_shortname + '.disqus.com/count.js';
    (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
}


window.onscroll = function(e) {
	if(!disqus_enabled){
		return;
	}
	var disqusThread = document.getElementById('disqus_thread');
	if(!disqusThread){
		return;
	}
	var currentScroll = (window.innerHeight + window.scrollY), elScroll = disqusThread.offsetTop;
	if (currentScroll >= elScroll && !disqusLoaded) {
		disqusLoaded = true;
		disqusThread.innerHTML = '';
		resetDisqus();
	}
};


// https://github.com/rails/turbolinks
document.addEventListener('page:fetch',   function() {
	disqusLoaded = false;
	NProgress.start();
});
document.addEventListener('page:change',  function() {
	resetCount();
	loadDisqusEmbedScript();
	NProgress.done();
});
document.addEventListener('page:restore', function() {
	NProgress.remove();
});