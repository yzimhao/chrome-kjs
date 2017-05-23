if(Hls.isSupported()) {
    var video = document.getElementById('video');
    var hls = new Hls();
    var urls = window.location.href.split("?")
    var m3u8 = decodeURIComponent(urls[1]);

    video.style.width = "1024px";
    video.style.heigth = "780px";

    document.title = m3u8;
    hls.loadSource(m3u8);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED,function() {
        video.play();
    });

}
