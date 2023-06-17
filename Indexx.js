if(window.File && window.FileReader && window.FileList && window.Blob) {
    function handleFileSelect(evt) {
        let file = evt.target.files[0];

        if (!file.type.match('video.*')) {
            return;
        }
        let reader = new FileReader();

        reader.onload = (function (File) {
            return function (e) {
                let videoDiv = document.getElementsByClassName('Video');

                if(videoDiv[0] != null) {
                    videoDiv[0].parentNode.removeChild(videoDiv[0]);
                }
                    
                let div = document.createElement('div');
                div.id = "div_video";
                div.className = "Video";
                div.innerHTML = '<video controls id="video" src="' + e.target.result + '" title="' + File.name + '"/>';

                document.getElementById('output_video').insertBefore(div, null);

                let cargando = document.createElement('c');

                cargando.id = "cargando";
                cargando.className = "cargando";
                cargando.innerHTML = 'Cargando el video...';

                document.getElementById('output_video').insertBefore(cargando, null);

                let reproducir = document.getElementById('reproducir');
                let pausar = document.getElementById('pausar');
                let subirvol = document.getElementById('subir');
                let bajarvol = document.getElementById('bajar');
                
                reproducir.addEventListener('click', () => {
                    document.getElementById('video').play();
                });
                
                pausar.addEventListener('click', () => {
                    document.getElementById('video').pause();
                })

                subirvol.addEventListener('click', () => {
                    document.getElementById('video').volume += 0.1;
                })

                bajarvol.addEventListener('click', () => {
                    document.getElementById('video').volume -= 0.1;
                })

                document.getElementById('video').addEventListener('canplay', () => {
                    let cargando = document.getElementById('cargando');

                    document.getElementById('output_video').removeChild(cargando);

                    document.getElementById('video').style.visibility = "visible";

                    reproducir.style.visibility = "visible";
                    pausar.style.visibility = "visible";
                    subirvol.style.visibility = "visible";
                    bajarvol.style.visibility = "visible"; 
                });
            }
        }) (file);

        reader.readAsDataURL(file);
    } 

    document.getElementById('file').addEventListener('change', handleFileSelect, false);
} else {
    alert('El video no se puede reproducir...')
}