
window.addEventListener("DOMContentLoaded", function() {
  var userInput = document.getElementById("username");
  var passInput = document.getElementById("inputPassword");
  var button = document.getElementById("button");
  button.addEventListener("click", function(){
    var acct = {
      username: userInput.value,
      password: passInput.value
    }

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				var o = JSON.parse(xhr.responseText)
				console.log(o);
			}
		};

		xhr.open("POST", "/api/accounts/authenticate");
    xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(JSON.stringify(acct));
    console.log(JSON.stringify(acct));
  });
});
