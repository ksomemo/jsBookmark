var user = "" || window.prompt("Input gist username.");
var baseUrl = "https://gist.github.com/";
var page = 1;
var cloneCommand = "";

function gistCloneCommandList() {
	$.ajax({
		url: baseUrl + user + "?page=" + page,
		success: function (data) {
			var contents = $(data);
			contents.find("div.gist.gist-item span.creator a[href^='/" + user + "/']").each(function () {
				cloneCommand += "git clone " + this.href.replace(user + "/", "") + ".git " + this.children[0].innerHTML + "\n";
			});

			if (contents.find("div.pagination span.disabled:contains('Older')").length > 0) {
				alert("finish extract clone command.");
				console.log(cloneCommand);
				return;
			}

			page++;
			setTimeout(gistCloneCommandList, 200);
		},
		error: function () {
			alert(user + " does not exist.");
		}
	});
}

gistCloneCommandList();

