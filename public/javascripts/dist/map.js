!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="/Users/guoshencheng/Documents/OtherProject/map/public/javascripts/dist",__webpack_require__(0)}({0:function(module,exports,__webpack_require__){function drawPoints(){var mass=new AMap.MassMarks(list,{url:"http://7xpecj.com1.z0.glb.clouddn.com/2/point.png",anchor:new AMap.Pixel(10,10),size:new AMap.Size(20,20),opacity:1,cursor:"pointer",zIndex:1});mass.setMap(map)}function configurePoint(){var start=list2[0];animation=new AMap.Marker({map:map,position:start,icon:"http://7xpecj.com1.z0.glb.clouddn.com/6/fire_ball.png",offset:new AMap.Pixel((-40),(-20)),autoRotation:!0})}function clearMarks(){var mark=document.getElementsByClassName("amap-logo")[0];mark&&mark.parentElement&&mark.parentElement.removeChild(mark);var copyright=document.getElementsByClassName("amap-copyright")[0];copyright&&copyright.parentElement&&copyright.parentElement.removeChild(copyright)}function configureData(p){function getArray(p){list.push({lnglat:[p.lon,p.lat]}),list2.push(new AMap.LngLat(p.lon,p.lat)),p.nodes&&p.nodes.length>0&&p.nodes.forEach(function(node){getArray(node)})}list=[],list2=[],getArray(p)}function getBounzeValue(value){return-4*(value-.5)*(value-.5)+1}function animate(){textAnimation.update(),requestAnimationFrame(animate)}var p=window.point,map=new AMap.Map("map_container");p&&map.setCenter([p.lon,p.lat]);var list,list2,animation;JSON.parse(localStorage.renyanContentShare);clearMarks(),map.on("complete",function(){configureData(p),drawPoints(),configurePoint(),animationLine()}),map.setZoom(5);var configure=__webpack_require__(5);configure();var animationLine=function(){animation.moveAlong(list2,6e5,function(k){return k},!0)};window.setSpeadCount=function(viewed,added){var userCountText=document.getElementById("friend_push_count"),viewCountText=document.getElementById("view_push_count");userCountText&&viewCountText&&(userCountText.textContent=viewed/added+1,viewCountText.style.color="#FF3F3F"),textAnimation.beginValue=viewed,textAnimation.endValue=viewed+added,textAnimation.start()};var textAnimation={};textAnimation.running=!1,textAnimation.beginValue=0,textAnimation.endValue=0,textAnimation.progress=0,textAnimation.caculateCurrent=function(){return(this.endValue-this.beginValue)*this.progress+this.beginValue},textAnimation.start=function(){this.progress=0,this.running=!0},textAnimation.stop=function(){this.running=!1},textAnimation["continue"]=function(){this.progress<0&&(this.running=!0)},textAnimation.update=function(){if(this.running){textAnimation.progress+=.02;var current=textAnimation.caculateCurrent().toFixed(0),fontSize=14+14*getBounzeValue(textAnimation.progress),userCountText=document.getElementById("friend_push_count"),viewCountText=document.getElementById("view_push_count");userCountText&&viewCountText&&(viewCountText.textContent=current,viewCountText.style.fontSize=fontSize+"px"),textAnimation.progress>=1&&(this.running=!1)}},animate()},5:function(module,exports){function configureSpreadButton(){var spread=document.getElementById("spread_button");spread&&(renyanContentShare[spreadParams.cid]?spread.style.backgroundImage="url('http://7xpecj.com1.z0.glb.clouddn.com/spreaded_button_icon.png')":spread.style.backgroundImage="url('http://7xpecj.com1.z0.glb.clouddn.com/spread_button_icon.png')")}function hideShareButton(){if(!(window.webkit&&webkit.messageHandlers&&webkit.messageHandlers.share&&webkit.messageHandlers.share.postMessage||window.android&&android.share)){var button=document.getElementById("share_button");button&&(button.style.display="none")}}var configure=function(){window.clickSpreadButton=function(){if(renyanContentShare[spreadParams.cid])console.log("has sended");else{var spread=document.getElementById("spread_button");Ajax("https://app.ry.api.renyan.cn/rest/share/spread/"+spreadParams.cid).post({a:1}).done(function(result){"success"==result&&(renyanContentShare[spreadParams.cid]=!0,localStorage.renyanContentShare=JSON.stringify(renyanContentShare),setSpeadCount(spreadParams.viewed,spreadParams.added),spread.style.backgroundImage="url('http://7xpecj.com1.z0.glb.clouddn.com/spreaded_button_icon.png')")})}},configureSpreadButton(),hideShareButton()};module.exports=configure}});