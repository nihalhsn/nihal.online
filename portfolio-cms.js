/* CMS bridge: reads the Git-managed JSON and updates existing site content without changing layout. */
(async function(){
  try {
    const response = await fetch('/content/portfolio.json', {cache:'no-store'});
    if (!response.ok) return;
    const c = await response.json();
    const setText = (selector, value) => { const el=document.querySelector(selector); if(el && typeof value==='string') el.textContent=value; };
    setText('#about .section-heading > p', c.aboutIntro);
    setText('#about .about-story > p', c.aboutBody);
    setText('#skills .section-heading > p', c.skillsIntro);
    setText('#certifications .section-heading-row > p', c.certificationsIntro);
    setText('#projects .section-heading-row > p', c.projectsIntro);
    setText('#contact .contact-main > p', c.contact && c.contact.intro);
    const education=[...document.querySelectorAll('#about .education-card')];
    (c.education||[]).forEach((item,i)=>{const el=education[i];if(!el)return;el.querySelector('.education-year')?.replaceChildren(document.createTextNode(item.year||''));el.querySelector('h3')?.replaceChildren(document.createTextNode(item.title||''));el.querySelector('p')?.replaceChildren(document.createTextNode(item.institution||''));el.querySelector('small')?.replaceChildren(document.createTextNode(item.details||''));});
    const skillCards=[...document.querySelectorAll('#skills .capability-card')];
    (c.skillGroups||[]).forEach((group,i)=>{const el=skillCards[i];if(!el)return;el.querySelector('h3')?.replaceChildren(document.createTextNode(group.title||''));el.querySelector(':scope > p')?.replaceChildren(document.createTextNode(group.description||''));const chips=el.querySelector('.chip-cloud');if(chips){chips.replaceChildren(...(group.items||[]).map(v=>{const s=document.createElement('span');s.textContent=v;return s;}));}});
    const toolGroups=[...document.querySelectorAll('#skills .tool-group')];
    (c.toolGroups||[]).forEach((group,i)=>{const el=toolGroups[i];if(!el)return;el.querySelector('.tool-label')?.replaceChildren(document.createTextNode(group.title||''));const list=el.querySelector('.tool-list');if(list)list.replaceChildren(...(group.items||[]).map(v=>{const s=document.createElement('span');s.textContent=v;return s;}));});
    const certs=[...document.querySelectorAll('#certifications .cert-card-new')];
    (c.certifications||[]).forEach((item,i)=>{const el=certs[i];if(!el)return;el.querySelector('h3')?.replaceChildren(document.createTextNode(item.title||''));el.querySelector('p')?.replaceChildren(document.createTextNode(item.description||''));const foot=el.querySelector('.cert-foot');if(foot){const icon=foot.querySelector('i');foot.replaceChildren(document.createTextNode(item.category||''));if(icon)foot.append(' ',icon);}});
    const projects=[...document.querySelectorAll('#projects .project-card-new')];
    (c.projects||[]).forEach((item,i)=>{const el=projects[i];if(!el)return;el.querySelector('.project-copy h3')?.replaceChildren(document.createTextNode(item.title||''));el.querySelector('.project-copy > p')?.replaceChildren(document.createTextNode(item.description||''));const label=el.querySelector('.project-label');if(label)label.textContent=item.category||'';const tech=el.querySelector('.project-tech');if(tech)tech.replaceChildren(...(item.technologies||[]).map(v=>{const s=document.createElement('span');s.textContent=v;return s;}));const link=el.querySelector('.project-link');if(link && item.url){link.href=item.url;}});
    if(c.contact){const emailLinks=[...document.querySelectorAll('#contact a[href^="mailto:"]')];emailLinks.forEach(a=>{a.href='mailto:'+c.contact.email;const b=a.querySelector('b');if(b)b.textContent=c.contact.email;});const phone=document.querySelector('#contact a[href^="tel:"]');if(phone){phone.href='tel:'+c.contact.phone;const b=phone.querySelector('b');if(b)b.textContent=c.contact.phone;}const li=document.querySelector('#contact a[href*="linkedin.com"]');if(li)li.href=c.contact.linkedin;const loc=document.querySelector('#contact .contact-location');if(loc){const icon=loc.querySelector('i');loc.replaceChildren();if(icon)loc.append(icon,document.createTextNode(' '+c.contact.location));}}
  } catch(e) { console.warn('Portfolio CMS content could not be loaded; using built-in HTML.', e); }
})();
