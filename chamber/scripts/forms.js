import { current_date } from "./date.mjs";

const myInfo = new URLSearchParams(window.location.search);
//console.log(myInfo);




document.querySelector('#results').innerHTML = `
<p><strong>Application for ${myInfo.get('gname')} ${myInfo.get('fname')}</strong></p>
<p><strong>Your Title:</strong> ${myInfo.get('org-title')}</p> 
<p><strong>Your Email:</strong> ${myInfo.get('email')}</p>
<p><strong>Your Phone:</strong> ${myInfo.get('phone')}</p>
<p><strong>Your Organization:</strong> ${myInfo.get('org-name')}</p>
<p><strong>Your Business Description:</strong> ${myInfo.get('occupation-desc')}</p>
<p><strong>Your Membership Level:</strong> ${myInfo.get('membership')}</p>
<p><strong>Date and Time of Application:</strong> ${current_date}</p>`