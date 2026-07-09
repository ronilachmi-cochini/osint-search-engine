function searchOSINT(){

let query=document.getElementById("query").value;
let type=document.getElementById("type").value;
let results=document.getElementById("results");

if(query==""){
results.innerHTML="<div class='result'>נא להזין נתון לחיפוש</div>";
return;
}

let sources={

username:[
["WhatsMyName","https://whatsmyname.app/"],
["Namechk","https://namechk.com/"]
],

email:[
["Have I Been Pwned","https://haveibeenpwned.com/"],
["EmailRep","https://emailrep.io/"]
],

domain:[
["WHOIS","https://who.is/"],
["SecurityTrails","https://securitytrails.com/"]
],

phone:[
["Truecaller","https://www.truecaller.com/"],
["NumVerify","https://numverify.com/"]
],

ip:[
["IPInfo","https://ipinfo.io/"],
["AbuseIPDB","https://www.abuseipdb.com/"]
],

image:[
["Google Lens","https://lens.google.com/"],
["Yandex Images","https://yandex.com/images/"]
]

};


results.innerHTML="<h3>תוצאות עבור: "+query+"</h3>";


sources[type].forEach(function(site){

results.innerHTML +=

`
<div class="result">
<b>${site[0]}</b><br>
<a href="${site[1]}" target="_blank">
פתח כלי חיפוש
</a>
</div>
`;

});


}
