function start() {
	midcont = document.getElementById("comic");
	if(midcont){
		image = midcont.getElementsByTagName("img")[0];
		if(image){
			div = document.createElement("div");
			div.setAttribute("style",(settings.mouseOver?"display:none;":"")+"padding: 5px;"+(!settings.white?"background:black;"+(settings.top?"margin-bottom:20px;":"")+"color:white;":"color:black;")+"position: relative; top: 5px;font-size:"+(settings.size||"16")+"px;")
			
				
			div.innerHTML = image.getAttribute("title");
			if(image.nextSibling){
				image.parentNode.insertBefore(div,settings.top?image:image.nextSibling);
			}
			else{
				if(settings.top)
					image.parentNode.insertBefore(div,image);
				else
					image.parentNode.appendChild(div);
			}
			image.setAttribute("title","");
			if(settings.mouseOver){
				image.addEventListener("mouseover",function(d){return function(){d.style.display="";settings.top&&window.scrollBy(0,d.offsetHeight+20);};}(div));
				image.addEventListener("mouseout",function(d){return function(){settings.top&&window.scrollBy(0,-d.offsetHeight-20);d.style.display="none";};}(div));
			}
		}
	}
}

function fillSettings(response){
	settings = response.settings;
	start();
}
chrome.extension.sendMessage({settings:true},fillSettings);