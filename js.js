function storage(type,target,time){
  this.type=type;
  this.target=target;
  this.time=time;
  this.elements=function(){
    return "Type: "+this.type+", Target : "+this.target+" , Time : "+this.time;
  }
}

function random( s){
return Math.floor(Math.random()*s);
}
function generation(target){
 
    for(var i=0;i<26;i++)freq[i]=0;
    var x=document.getElementById("r").value;
    var par=document.getElementById("parent"); 
    var pic=document.getElementById("im");
   par.innerHTML="";
   pic.src="";
  pic.style="width: ;height: ;border: ";
   if(x>26||x<1||isNaN(x)){
     par.innerHTML="Entert correct Value ";
     return;
   }
   
  
   var time=new Date();
   for(var i=0;i<x;i++){
     var rad=random(26);
     while(freq[rad]){
         rad=random(26);
   }
     freq[rad]=1;
     var node=document.createElement("button");
     node.setAttribute("class","bu");
     var text=document.createTextNode(list[rad]);
     node.appendChild(text);
     par.appendChild(node);
     node.addEventListener("click",function(e){
      pic.setAttribute("src",("Animals/"+this.textContent+".jpg"));
      var btns=new storage(e.type,e.target,new Date());
      if(localStorage[e.target.textContent]){
      var button1=Array(localStorage.getItem(e.target.textContent));
      button1.push(btns.elements());
      localStorage.setItem(e.target.textContent,button1);
      }
      else
      localStorage.setItem(e.target.textContent,btns.elements());
    });
 }
 var generate1=new storage(target.type,target.target,time);
 if(localStorage["generate"]){
   var gens=Array(localStorage.getItem("generate"));
   gens.push(generate1.elements());
   localStorage.setItem("generate",gens);
 }
 else
 localStorage.setItem("generate",generate1.elements()); 
}
var list=new Array();
var freq=new Array();
for(var i=0;i<=25;i++)list.push(String.fromCharCode(65+i));
for(var i=0;i<26;i++)freq.push(0);
var gen=document.getElementById("g");
gen.addEventListener("click",function(e){
  generation(e);
});
window.addEventListener("load",function(e){
  var load1=new storage(e.type,e.target,new Date());
  if(localStorage["load"]){
    var loads=Array(localStorage.getItem("load"));
    loads.push(load1.elements());
  localStorage.setItem("load",loads);
  }
  else
  localStorage.setItem("load",load1.elements());
});
window.addEventListener("unload",function(e){
  var unload1=new storage(e.type,e.target,new Date());
  if(localStorage["unload"]){
    var unloads=Array(localStorage.getItem("unload"));
    unloads.push(unload1.elements());
  localStorage.setItem("unload",unloads);
  }
  else
  localStorage.setItem("unload",unload1.elements());
})
setInterval(function(){
  localStorage.clear();
    },5000); 

