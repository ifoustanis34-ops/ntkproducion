/**
 * Script inline (exécuté avant l'hydratation React) :
 * - marque <html data-js> pour activer les états initiaux des révélations ;
 * - observe tous les [data-reveal], y compris ceux ajoutés lors des navigations.
 */
const code = `(function(){var d=document.documentElement;d.setAttribute('data-js','');
if(!('IntersectionObserver' in window)){d.removeAttribute('data-js');return;}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.setAttribute('data-shown','');io.unobserve(e.target);}});},{rootMargin:'0px 0px -10% 0px'});
var seen=new WeakSet();function scan(){document.querySelectorAll('[data-reveal]:not([data-shown])').forEach(function(el){if(!seen.has(el)){seen.add(el);io.observe(el);}});}
scan();new MutationObserver(scan).observe(d,{childList:true,subtree:true});})();`;

export function RevealScript() {
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
