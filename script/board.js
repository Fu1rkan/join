function toggleTaskOverlay(id){
    let bleurBg = document.getElementById('bleur-bg');
    let dialog = document.getElementById(`${id}`);
    bleurBg.classList.toggle('d_none');
    dialog.classList.toggle('tf_tlx100');
}

function stopPropagation(event) {
    event.stopPropagation();
}