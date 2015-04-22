"use strict";

window.addEventListener("DOMContentLoaded", function() {

	var dropArea = document.getElementById("drop-area");

	dropArea.addEventListener("dragover", function(e) {
		e.preventDefault();
	});

	dropArea.addEventListener("drop", function(e) {
		e.preventDefault();

		var fd = new FormData();

		for (var x=0; x<e.dataTransfer.files.length; x++) {
			fd.append("file_" + x, e.dataTransfer.files[x]);
		}

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				var o = JSON.parse(xhr.responseText)
				console.log(o);
			}
		};

		xhr.open("POST", "/api/gallery");
		xhr.send(fd);

	});

});
