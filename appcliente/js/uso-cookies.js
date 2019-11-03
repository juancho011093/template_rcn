var fecha = new Date();
var expiresdate = new Date(2068, 1, 02, 11, 20);
var nombre = "aceptocookies";
var dateacept = fecha.toUTCString();
var Cookies = document.cookie;
var CookiesResult = Cookies.split(";");
var contcookie = 0;
console.log(CookiesResult);
for(var i = 0; i < CookiesResult.length; i++){
    if(CookiesResult[i]=="Cookies=Acepto" || CookiesResult[i]==" Cookies=Acepto"){contcookie = contcookie + 1;}
}
if(contcookie == 0){
    console.log("ENTRO A COOKIES  " + contcookie);
    var divcookie = document.getElementById('cookies');
    divcookie.classList.add("cookies");
    divcookie.classList.remove("cookies-hidden");
    var btniagree = document.getElementById("iagree");
    btniagree.onclick = function(){
        document.cookie = "RCNCookies=Acepto; expires=" + expiresdate.toUTCString();
        var clase = 'cookies';
        if (divcookie.classList.contains("cookies")) {
            divcookie.classList.add("cookies-hidden");
            divcookie.classList.remove("cookies");
        }
    }
}