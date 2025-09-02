const CLIENT_ID = "1055836813442-av7ah6hlknksuon30i77ib6mitjrh7e2.apps.googleusercontent.com";
const ADMIN_EMAIL = "qw0907qw@gmail.com";
let currentUser=null;let isAdmin=false;
function handleCredentialResponse(response){const data=parseJwt(response.credential);currentUser=data.email;if(currentUser===ADMIN_EMAIL){isAdmin=true;document.body.classList.add("admin-mode");alert("관리자 모드 활성화");}else{alert(currentUser+"님 환영합니다!");}}
function parseJwt(token){let base64Url=token.split('.')[1];let base64=base64Url.replace(/-/g,'+').replace(/_/g,'/');let jsonPayload=decodeURIComponent(atob(base64).split('').map(function(c){return'%'+('00'+c.charCodeAt(0).toString(16)).slice(-2);}).join(''));return JSON.parse(jsonPayload);}
const translations={ko:{welcome:"환영합니다!",vote:"투표하기",fanart:"팬아트"},en:{welcome:"Welcome!",vote:"Vote Now",fanart:"Fan Art"}};
function setLang(lang){document.querySelectorAll("[data-i18n]").forEach(el=>{const key=el.getAttribute("data-i18n");el.textContent=translations[lang][key]||key;});}
function backupData(){if(!isAdmin)return alert("관리자만 접근 가능");fetch("data.json").then(res=>res.json()).then(data=>{const blob=new Blob([JSON.stringify(data)],{type:"application/json"});const link=document.createElement("a");link.href=URL.createObjectURL(blob);link.download="backup.json";link.click();});}
function restoreData(file){if(!isAdmin)return alert("관리자만 접근 가능");const reader=new FileReader();reader.onload=function(){const data=JSON.parse(reader.result);console.log("복원 데이터:",data);};reader.readAsText(file);}