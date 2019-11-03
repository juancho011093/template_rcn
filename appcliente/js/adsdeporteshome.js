       
   $.ajax({ url: "https://ads.canalrcn.tech/NewGetAllUnits.php?search=DEPORTESRCN_Home_", success: function(ads){
       var ads = JSON.parse(ads);
       if(ads.length > 0){
           var scriptGPT = document.createElement('script');
           scriptGPT.src = 'https://www.googletagservices.com/tag/js/gpt.js';
           var scriptTAG = document.createElement('script');
           scriptTAG.innerHTML="var googletag = googletag || {}; googletag.cmd = googletag.cmd || [];";
           var scriptPUSH = document.createElement('script');
           scriptPUSH.innerHTML="googletag.cmd.push(function() {";           
           document.getElementsByTagName('head')[0].appendChild(scriptTAG);
           document.getElementsByTagName('head')[0].appendChild(scriptGPT);
           $.each(ads, function( indexads, value ) {
               var sizes;
               sizes = "["+value.sizes[0].width+","+value.sizes[0].height+"]";
                   if(value.sizes.length > 1){
                      sizes = "[";
                       $.each(value.sizes, function( index, valueSize ) {
                           if(index == value.sizes.length-1){
                               sizes = sizes + "["+valueSize.width+","+valueSize.height+"]";
                           }else{
                               sizes = sizes + "["+valueSize.width+","+valueSize.height+"],";
                           }
                       });
                      sizes = sizes + "]";
                   }
                   scriptPUSH.innerHTML= scriptPUSH.innerHTML+ "googletag.defineSlot('/205320464/DEPORTESRCN/HOME/"+value.name+"',"+sizes+", '"+value.name+"').addService(googletag.pubads());";
           });
           scriptPUSH.innerHTML= scriptPUSH.innerHTML+"googletag.pubads().enableSingleRequest(); googletag.pubads().collapseEmptyDivs(); googletag.pubads().enableLazyLoad({fetchMarginPercent: 500,renderMarginPercent: 50,mobileScaling: 2.0}); googletag.enableServices()});";
           document.getElementsByTagName('head')[0].appendChild(scriptPUSH);
           $.each(ads, function( index, value ) {
               googletag.cmd.push(function() { googletag.display(value.name); });
           })
       }
    }});

